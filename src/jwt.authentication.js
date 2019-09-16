import { assign } from 'lodash';
import { saveToken, getToken } from './jwt.utils';

export default function jwtAuthenticationProvider() {
  let jwtOptions = {
    accessTokenURI: '/api/accessToken',
    refreshTokenURI: '/api/refreshToken',
    redirect: '/auth/login',
    accessTokenKey: '_jwt_accessToken',
    refreshTokenKey: '_jwt_refreshToken'
  };

  this.changeOptions = (options) => {
    jwtOptions = assign(jwtOptions, options);
  };

  this.$get = ['$http', function ($http) {
    let accessToken = getToken(jwtOptions.accessTokenKey);
    let refreshToken = getToken(jwtOptions.refreshTokenKey);

    function saveAccessToken(value) {
      saveToken(jwtOptions.accessTokenKey, value)
    }

    function saveRefreshToken(value) {
      saveToken(jwtOptions.refreshTokenKey, value);
    }

    return {
      get config() {
        return jwtOptions;
      },
      login: (username, password) => {
        return $http
          .post(jwtOptions.accessTokenURI, { username, password })
          .then((arg) => {
            const { data } = arg;
            ({ accessToken, refreshToken } = data);
            saveAccessToken(accessToken);
            saveRefreshToken(refreshToken);
            return data;
          });
      },
      get accessToken() {
        return accessToken;
      },
      saveAccessToken: saveAccessToken,
      saveRefreshToken: saveRefreshToken,
      refreshToken: () => {
        console.log('發起交換 Token');
        return $http
          .post(jwtOptions.refreshTokenURI)
          .then((arg) => {
            console.log('交換 Token 完畢');
            const { data } = arg;
            ({ accessToken, refreshToken } = data);
            saveAccessToken(accessToken);
            saveRefreshToken(refreshToken);
            return data;
          });
      },
    };
  }];
}
