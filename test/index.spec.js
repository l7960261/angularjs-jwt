import { assert } from 'chai';

describe('Main Module', () => {
  let service;

  beforeEach(
    angular.mock.module('angularjs-jwt')
  );

  beforeEach(
    angular.mock.inject(($injector) => {
      service = $injector.get('jwtAuthentication');
    })
  );

  it('jwtAuthentication should be default value', () => {
    assert.equal(service.config.accessTokenURI, '/api/accessToken');
    assert.equal(service.config.refreshTokenURI, '/api/refreshToken');
    assert.equal(service.config.redirect, '/auth/login');
    assert.equal(service.config.storeKeyAccessToken, '_jwt_access_token');
    assert.equal(service.config.storeKeyRefreshToken, '_jwt_refresh_token');
  });
});
