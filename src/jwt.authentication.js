import { assign } from 'lodash';
import { saveToken, getToken } from './jwt.utils';

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

  this.$get = ['$http', function ($http) {
    let accessToken = getToken(jwtOptions.storeKeyAccessToken);
    let refreshToken = getToken(jwtOptions.storeKeyRefreshToken);

    function saveAccessToken(value) {
      accessToken = value;
      saveToken(jwtOptions.storeKeyAccessToken, value);
    }

    function saveRefreshToken(value) {
      refreshToken = value;
      saveToken(jwtOptions.storeKeyRefreshToken, value);
    }

    return {
      get config() {
        return jwtOptions;
      },
      login: (username, password) => $http
        .post(jwtOptions.accessTokenURI, { username, password })
        .then((arg) => {
          const { data } = arg;

          saveAccessToken(data.accessToken);
          saveRefreshToken(data.refreshToken);
          return data;
        }),
      get accessToken() {
        return accessToken;
      },
      saveAccessToken,
      saveRefreshToken,
      refreshToken: () => {
        console.log('發起交換 Token');
        return $http
          .post(jwtOptions.refreshTokenURI)
          .then((arg) => {
            const { data } = arg;

            saveAccessToken(data.accessToken);
            saveRefreshToken(data.refreshToken);
            console.log('交換 Token 完畢');
            return data;
          });
      },
    };
  }];
}
