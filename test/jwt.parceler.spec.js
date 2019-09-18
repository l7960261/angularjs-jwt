import chai from 'chai';

describe('jwt.parceler', () => {
  const atKey = '_jwt_access_token';
  const rtKey = '_jwt_refresh_token';
  const fakeJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let jwtParceler;

  beforeEach(
    angular.mock.module('angularjs-jwt')
  );

  beforeEach(
    angular.mock.inject(['$injector', ($injector) => {
      // Set up variables
      jwtParceler = $injector.get('jwtParceler');
    }])
  );

  afterEach(() => {
    localStorage.clear();
  });

  it('setToken with empty value', () => {
    jwtParceler.setToken(atKey, '');
    chai.assert.equal(localStorage.getItem(atKey), '');
  });

  it('getAccessToken with payload name equal as "John Doe"', () => {
    localStorage.setItem(atKey, fakeJwtToken);
    const actual = jwtParceler.getAccessToken(atKey);
    chai.assert.equal(actual.payload.name, 'John Doe');
  });

  it('getAccessToken with invalid token', () => {
    const actual = jwtParceler.getAccessToken(atKey);
    chai.assert.isUndefined(actual);
  });

  it('getRefreshToken with value', () => {
    const actual = jwtParceler.getRefreshToken(rtKey);
    chai.assert.isNull(actual);
    // Mock refresh_token
    localStorage.setItem(rtKey, 'REFRESH');
    chai.assert.equal(jwtParceler.getRefreshToken(rtKey), 'REFRESH');
  });
});
