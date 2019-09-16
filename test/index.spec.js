import { assert } from 'chai';

describe('Main Module', () => {
  let options;

  beforeEach(
    angular.mock.module('angularjs-jwt')
  );

  beforeEach(
    angular.mock.inject(($injector) => {
      options = $injector.get('jwtOptions');
    })
  );

  it('jwtOptions should be default value', () => {
    assert.equal(options.accessTokenAPI, '/api/accessToken');
    assert.equal(options.refreshTokenAPI, '/api/refreshToken');
    assert.equal(options.loginPage, '/auth/login');
  });
});
