export default function jwtInterceptorProvider() {
  this.$get = ['$q', '$injector', '$location', function jwtInterceptorFactory($q, $injector, $location) {
    const replays = [];
    let refreshTokenPromise;

    return {
      request: (config) => {
        const reassignConfig = config;
        reassignConfig.headers = reassignConfig.headers || {};
        const { accessToken } = $injector.get('jwtAuthentication');
        if (accessToken) {
          reassignConfig.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (reassignConfig.url === $injector.get('jwtAuthentication').config.refreshTokenURI) {
          return reassignConfig;
        }

        return refreshTokenPromise
          ? refreshTokenPromise.then(() => reassignConfig)
          : reassignConfig;
      },
      requestError: rejection => $q.reject(rejection),
      response: response => response,
      responseError: (response) => {
        function clearRefreshTokenPromise(auth) {
          if (replays.length === 0) {
            refreshTokenPromise = null;
            // console.log('Clean refresh token promise.');
          }

          return auth;
        }

        function replayRequests(auth) {
          const replay = replays.shift();
          replay.success();

          return auth;
        }

        function cancelRequestsAndRedirect() {
          refreshTokenPromise = null;
          replays.forEach((replay) => {
            replay.cancel();
          });

          replays.length = 0;

          // SET YOUR LOGIN PAGE
          $location.url($injector.get('jwtAuthentication').config.redirect);
        }

        if (response.status === 401) {
          return $q((resolve, reject) => {
            const replay = {
              success: () => {
                $injector.get('$http')(response.config).then(resolve, reject);
              },

              cancel: () => {
                reject(response);
              }
            };

            replays.push(replay);

            if (!refreshTokenPromise) {
              refreshTokenPromise = $injector.get('jwtAuthentication') // REFRESH TOKEN HERE
                .fetchRefreshToken()
                .then(replayRequests)
                .catch(cancelRequestsAndRedirect)
                .finally(clearRefreshTokenPromise);
            } else {
              refreshTokenPromise = refreshTokenPromise
                .then(replayRequests)
                .catch(cancelRequestsAndRedirect)
                .finally(clearRefreshTokenPromise);
            }
          });
        }

        return $q.reject(response);
      },
    };
  }];
}
