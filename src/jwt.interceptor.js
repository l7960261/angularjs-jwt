import { random } from 'lodash';

export default function jwtInterceptorProvider() {
  this.$get = ['$q', '$injector', '$location', function jwtInterceptorFactory($q, $injector, $location) {
    const detectInterval = 1500;
    const detectMaxTimes = 2;
    const detectTimer = {};
    let detectTimes = 0;
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
      requestError: (rejection) => $q.reject(rejection),
      response: (response) => response,
      responseError: (response) => {
        function replayRequests() {
          replays.forEach((replay) => {
            replay.success();
          });

          replays.length = 0;
        }

        function cancelRequestsAndRedirect() {
          refreshTokenPromise = null;
          replays.forEach((replay) => {
            replay.cancel();
          });

          replays.length = 0;

          // Set your login page
          $location.url($injector.get('jwtAuthentication').config.redirect);
        }

        function clearRefreshTokenPromise() {
          detectTimer[random(0, 100000)] = setInterval(() => {
            detectTimes += 1;

            if (replays.length !== 0) {
              // reset detectTimes
              detectTimes = 0;
              // reAssign
              refreshTokenPromise = refreshTokenPromise
                .then(replayRequests)
                .catch(cancelRequestsAndRedirect)
                .finally(clearRefreshTokenPromise);
            } else if (replays.length === 0 && detectTimes > detectMaxTimes) {
              // clear all intervalID
              Object.keys(detectTimer)
                .forEach((key) => {
                  clearInterval(detectTimer[key]);
                });
              // clear promise
              refreshTokenPromise = null;
            }
            // next detect
          }, detectInterval);
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
            }
          });
        }

        return $q.reject(response);
      },
    };
  }];
}
