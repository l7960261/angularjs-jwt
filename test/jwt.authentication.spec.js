import chai from 'chai';
import sinon from 'sinon';

describe('jwt.authentication', () => {
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
      sinon.spy(jwtParceler, 'setAccessToken');
      sinon.spy(jwtParceler, 'setRefreshToken');
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

  it('config should has default value', () => {
    chai.assert.equal(jwtAuthentication.config.accessTokenURI, '/api/accessToken');
    chai.assert.equal(jwtAuthentication.config.refreshTokenURI, '/api/refreshToken');
    chai.assert.equal(jwtAuthentication.config.redirect, '/auth/login');
  });

  it('accessToken is undefined', () => {
    const expected = undefined;
    chai.assert.equal(jwtAuthentication.accessToken, expected);
  });

  it('login should call /api/accessToken', () => {
    $httpBackend.expectPOST('/api/accessToken');
    jwtAuthentication.login();
    $httpBackend.flush();
    chai.assert(jwtParceler.setAccessToken.calledOnce);
    chai.assert(jwtParceler.setRefreshToken.calledOnce);
  });

  it('fetchRefreshToken should call /api/refreshToken', () => {
    $httpBackend.expectPOST('/api/refreshToken');
    jwtAuthentication.fetchRefreshToken();
    $httpBackend.flush();
    chai.assert(jwtParceler.setAccessToken.calledOnce);
    chai.assert(jwtParceler.setRefreshToken.calledOnce);
  });
});
