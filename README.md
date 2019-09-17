# angularjs-jwt

[![Build Status](https://travis-ci.com/l7960261/angularjs-jwt.svg?branch=master)](https://travis-ci.com/l7960261/angularjs-jwt) [![dependencies Status](https://david-dm.org/l7960261/angularjs-jwt/status.svg)](https://david-dm.org/l7960261/angularjs-jwt) [![devDependencies Status](https://david-dm.org/l7960261/angularjs-jwt/dev-status.svg)](https://david-dm.org/l7960261/angularjs-jwt?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Features

AngularJS for jwt support accessToken & refreshToken

# Install
```
npm i angularjs-jwt
```

# Use in HTML

```
  <script src="../dist/angularjs-jwt.js"></script>
  <script>
    angular.module('example-app', ['angularjs-jwt'])
      .config(['$httpProvider', 'jwtAuthenticationProvider', function (httpProvider, jwtAuthenticationProvider) {
        jwtAuthenticationProvider.changeOptions({
          accessTokenURI: 'yourAccessTokenURI',
          refreshTokenURI: 'yourRefreshTokenURI',
          redirect: 'yourRedirectPage'
        });
        $httpProvider.interceptors.push('jwtInterceptor');
      }])
  </script>
```

# Use in es6
```
import angular from 'angular';
import jwtModule from '../lib';

angular
  .module('example-es6', [jwtModule.name])
  .config(['$httpProvider', 'jwtAuthenticationProvider', function ($httpProvider, jwtAuthenticationProvider) {
    jwtAuthenticationProvider.changeOptions({
      accessTokenURI: 'yourAccessTokenURI',
      refreshTokenURI: 'yourRefreshTokenURI',
      redirect: 'yourRedirectPage'
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }]);
```

# License

MIT © Wilson Weng
