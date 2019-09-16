export default function jwtAuthentication($http, jwtOptions) {
  let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';

  return {
    getAccessToken: () => accessToken,
    refreshToken: () => {
      console.log('發起交換 Token');
      return $http
        .post(jwtOptions.refreshTokenAPI)
        .then((arg) => {
          console.log('交換 Token 完畢');
          const { data } = arg;
          ({ accessToken } = data);
          return data;
        });
    },
  };
}

jwtAuthentication.$inject = ['$http', 'jwtOptions'];
