import { assign } from 'lodash';

export default function jwtAuthenticationProvider() {
  let jwtOptions = {
    accessTokenURI: '/api/accessToken',
    refreshTokenURI: '/api/refreshToken',
    redirect: '/auth/login',
    storeKeyAccessToken: '_jwt_access_token',
    storeKeyRefreshToken: '_jwt_refresh_token'
  };

  this.changeOptions = (options) => {
    jwtOptions = assign(jwtOptions, options);
  };

  this.$get = ['$http', 'jwtParceler', function ($http, jwtParceler) {
    function setAccessToken(value) {
      jwtParceler.setToken(jwtOptions.storeKeyAccessToken, value);
    }

    function setRefreshToken(value) {
      jwtParceler.setToken(jwtOptions.storeKeyRefreshToken, value);
    }

    function login(username, password) {
      return $http
        .post(jwtOptions.accessTokenURI, { username, password })
        .then((arg) => {
          const { data } = arg;

          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          return data;
        });
    }

    function fetchRefreshToken() {
      console.log('發起交換 Token');
      const token = jwtParceler.getRefreshToken();
      return $http
        .post(jwtOptions.refreshTokenURI, { token })
        .then((arg) => {
          const { data } = arg;

          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          console.log('交換 Token 完畢');
          return data;
        });
    }

    return {
      get config() {
        return jwtOptions;
      },
      get accessToken() {
        return jwtParceler.getAccessToken(jwtOptions.storeKeyAccessToken);
      },
      login,
      setAccessToken,
      setRefreshToken,
      fetchRefreshToken,
    };
  }];
}
