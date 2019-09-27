# angularjs-jwt

[![Build Status](https://travis-ci.com/l7960261/angularjs-jwt.svg?branch=master)](https://travis-ci.com/l7960261/angularjs-jwt) [![dependencies Status](https://david-dm.org/l7960261/angularjs-jwt/status.svg)](https://david-dm.org/l7960261/angularjs-jwt) [![devDependencies Status](https://david-dm.org/l7960261/angularjs-jwt/dev-status.svg)](https://david-dm.org/l7960261/angularjs-jwt?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Features

AngularJS for jwt support accessToken & refreshToken

- HTTP request with Authorization header
- If get 401 response
  - Pending all requests
  - Fetch refresh token API to get latest access/refresh token
  - Fetch all 401 requests sequentially

# Install
```
npm i angularjs-jwt
```

# Use in HTML

```
<script src="https://unpkg.com/angularjs-jwt"></script>
<script>
  angular.module('example-app', ['angularjs-jwt'])
    .config([
      '$httpProvider',
      'jwtAuthenticationProvider',
      'jwtParcelerProvider',
      function (httpProvider, jwtAuthenticationProvider, jwtParcelerProvider) {
        jwtAuthenticationProvider.changeOptions({
          accessTokenURI: 'yourAccessTokenURI', // Optional
          refreshTokenURI: 'yourRefreshTokenURI', // Optional
          redirect: 'yourRedirectPage', // Optional
        });
        // If you want change storeKey, then use below.
        jwtParcelerProvider.changeOptions({
          storeKeyAccessToken: 'yourStoreKey', // Optional
          storeKeyRefreshToken: 'yourStoreKey', // Optional
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }]);
</script>
```

# Use in es6
```
import angular from 'angular';
import jwtModule from 'angularjs-jwt';

angular
  .module('example-es6', [jwtModule.name])
  .config([
    '$httpProvider',
    'jwtAuthenticationProvider',
    'jwtParcelerProvider',
    function ($httpProvider, jwtAuthenticationProvider, jwtParcelerProvider) {
      jwtAuthenticationProvider.changeOptions({
        accessTokenURI: 'yourAccessTokenURI', // Optional
        refreshTokenURI: 'yourRefreshTokenURI', // Optional
        redirect: 'yourRedirectPage', // Optional
      });
      // If you want change storeKey, then use below.
      jwtParcelerProvider.changeOptions({
        storeKeyAccessToken: 'yourStoreKey', // Optional
        storeKeyRefreshToken: 'yourStoreKey', // Optional
      });

      $httpProvider.interceptors.push('jwtInterceptor');
  }]);
```

## jwtAuthentication.login

```
angular.controller(['jwtAuthentication', function(jwtAuthentication) {
  // will setAccessToken & setRefreshToken from data.accessToken/refreshToken
  jwtAuthentication.login(username, password);
}]);
```

## jwtAuthentication.setAccessToken/RefreshToken
```
angular.controller(['jwtAuthentication', function(jwtAuthentication) {
  // Get token...
  jwtAuthentication.setAccessToken(yourAccessToken);
  jwtAuthentication.setRefreshToken(yourAccessToken);
}]);
```

# License

MIT © Wilson Weng
