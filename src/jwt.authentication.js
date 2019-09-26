import { assign } from 'lodash';

export default function jwtAuthenticationProvider() {
  let jwtOptions = {
    accessTokenURI: '/api/accessToken',
    refreshTokenURI: '/api/refreshToken',
    redirect: '/auth/login',
  };

  this.changeOptions = (options) => {
    jwtOptions = assign(jwtOptions, options);
  };

  this.$get = ['$http', 'jwtParceler', function jwtAuthenticationFactory($http, jwtParceler) {
    function login(username, password) {
      return $http
        .post(jwtOptions.accessTokenURI, { username, password })
        .then((arg) => {
          const { data } = arg;

          jwtParceler.setAccessToken(data.accessToken);
          jwtParceler.setRefreshToken(data.refreshToken);
          return data;
        });
    }

    function fetchRefreshToken() {
      // console.log('Fetch refresh token start.');
      const token = jwtParceler.getRefreshToken();
      return $http
        .post(jwtOptions.refreshTokenURI, { token })
        .then((arg) => {
          const { data } = arg;

          jwtParceler.setAccessToken(data.accessToken);
          jwtParceler.setRefreshToken(data.refreshToken);
          // console.log('Fetch refresh token complete.');
          return data;
        });
    }

    return {
      get config() {
        return jwtOptions;
      },
      get accessToken() {
        return jwtParceler.getAccessToken();
      },
      login,
      setAccessToken: jwtParceler.setAccessToken,
      setRefreshToken: jwtParceler.setRefreshToken,
      fetchRefreshToken,
    };
  }];
}
