export default function authService($q, $http, jwtOptions) {
  let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';
  let peding = false;

  return {
    getAccessToken: () => accessToken,
    pendingRefreshToken: () => peding,
    refreshToken: () => {
      console.log('發起交換 Token');
      peding = true;
      return $http
        .post(jwtOptions.refreshTokenAPI)
        .then((arg) => {
          console.log('交換 Token 完畢');
          const { data } = arg;
          ({ accessToken } = data);
          // Modify _peding
          peding = false;
          return data;
        });
    },
  };
}

authService.$inject = ['$q', '$http', 'jwtOptions'];
