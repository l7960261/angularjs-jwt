import chai from 'chai';
import sinon from 'sinon';

describe('Main Module', () => {
  let jwtAuthentication;
  let $httpBackend;
  let jwtParceler;

  beforeEach(
    angular.mock.module('angularjs-jwt')
  );

  beforeEach(
    angular.mock.inject(['$injector', ($injector) => {
      // Set up variables
      jwtAuthentication = $injector.get('jwtAuthentication');
      jwtParceler = $injector.get('jwtParceler');
      sinon.spy(jwtParceler, 'setToken');
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      // backend definition
      $httpBackend.when('POST', '/api/accessToken')
        .respond({ accessToken: '123', refreshToken: '321' });
      $httpBackend.when('POST', '/api/refreshToken')
        .respond({ accessToken: '123', refreshToken: '321' });
    }])
  );

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('jwtAuthentication.config should has default value', () => {
    chai.assert.equal(jwtAuthentication.config.accessTokenURI, '/api/accessToken');
    chai.assert.equal(jwtAuthentication.config.refreshTokenURI, '/api/refreshToken');
    chai.assert.equal(jwtAuthentication.config.redirect, '/auth/login');
    chai.assert.equal(jwtAuthentication.config.storeKeyAccessToken, '_jwt_access_token');
    chai.assert.equal(jwtAuthentication.config.storeKeyRefreshToken, '_jwt_refresh_token');
  });

  it('jwtAuthentication.accessToken', () => {
    const expected = undefined;
    chai.assert.equal(jwtAuthentication.accessToken, expected);
  });

  it('jwtAuthentication.login', () => {
    $httpBackend.expectPOST('/api/accessToken');
    jwtAuthentication.login();
    $httpBackend.flush();
    chai.assert(jwtParceler.setToken.calledTwice);
  });

  it('jwtAuthentication.setAccessToken', () => {
    const token = 'ABCD';
    jwtAuthentication.setAccessToken(token);
    chai.assert(jwtParceler.setToken.calledOnce);
  });

  it('jwtAuthentication.setRefreshToken', () => {
    const token = 'ABCD';
    jwtAuthentication.setRefreshToken(token);
    chai.assert(jwtParceler.setToken.calledOnce);
  });

  it('jwtAuthentication.fetchRefreshToken', () => {
    $httpBackend.expectPOST('/api/refreshToken');
    jwtAuthentication.fetchRefreshToken();
    $httpBackend.flush();
    chai.assert(jwtParceler.setToken.calledTwice);
  });
});
