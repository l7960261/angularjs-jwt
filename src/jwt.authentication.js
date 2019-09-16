import { assign } from 'lodash';

export default function jwtAuthenticationProvider() {
  let jwtOptions = {
    accessTokenURI: '/api/accessToken',
    refreshTokenURI: '/api/refreshToken',
    redirect: '/auth/login'
  };

  this.changeOptions = (options) => {
    jwtOptions = assign(jwtOptions, options);
  };

  this.$get = ['$http', function ($http) {
    let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';

    return {
      get config() {
        return jwtOptions;
      },
      getAccessToken: () => accessToken,
      refreshToken: () => {
        console.log('發起交換 Token');
        return $http
          .post(jwtOptions.refreshTokenURI)
          .then((arg) => {
            console.log('交換 Token 完畢');
            const { data } = arg;
            ({ accessToken } = data);
            return data;
          });
      },
    };
  }];
}
