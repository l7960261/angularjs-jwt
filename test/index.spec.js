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
    assert.equal(service.refreshTokenAPI(), '/api/refreshToken');
    assert.equal(service.loginPage(), '/auth/login');
  });
});
