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
