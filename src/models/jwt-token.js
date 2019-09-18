import IllegalJwtToken from './illegal-jwt-token';

const jwtDecode = require('jwt-decode');

export default class JwtToken {
  constructor(value) {
    this.raw = value;
    this.parsePayload();
  }

  parsePayload() {
    try {
      this.payload = jwtDecode(this.raw);
    } catch (error) {
      throw new IllegalJwtToken('The payload is not valid JWT payload and cannot be parsed.');
    }
  }

  toString() {
    return this.raw;
  }
}
