export default function jwtInterceptor($q, $injector) {
  const replays = [];
  let refreshTokenPromise;

  return {
    request: (config) => {
      const reassignConfig = config;
      reassignConfig.headers = reassignConfig.headers || {};
      const accessToken = $injector.get('auth').getAccessToken();
      if (accessToken) {
        reassignConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (reassignConfig.url === 'http://localhost:8080/api/authRefresh') {
        return reassignConfig;
      }

      return refreshTokenPromise ? refreshTokenPromise.then(() => reassignConfig) : reassignConfig;
    },
    requestError: rejection => $q.reject(rejection),
    response: response => response,
    responseError: (response) => {
      function clearRefreshTokenPromise(auth) {
        // if (replays.length == 0) {
        //   refreshTokenPromise = null;
        // }
        console.log('FINALLY');

        return auth;
      }

      function replayRequests(auth) {
        replays.forEach((replay) => {
          replay.success();
        });

        replays.length = 0;

        return auth;
      }

      function cancelRequestsAndRedirect() {
        refreshTokenPromise = null;
        replays.forEach((replay) => {
          replay.cancel();
        });

        replays.length = 0;

        // SET YOUR LOGIN PAGE
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

          if (!refreshTokenPromise && !$injector.get('auth').pendingRefreshToken()) {
            refreshTokenPromise = $injector.get('auth') // REFRESH TOKEN HERE
              .refreshToken()
              .then(replayRequests)
              .catch(cancelRequestsAndRedirect)
              .finally(clearRefreshTokenPromise);
          } else {
            refreshTokenPromise = refreshTokenPromise.then(replayRequests);
          }
        });
      }

      return $q.reject(response);
    },
  };
}

jwtInterceptor.$inject = ['$q', '$injector'];
