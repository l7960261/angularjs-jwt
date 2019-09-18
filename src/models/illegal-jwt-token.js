export default class IllegalJwtToken extends Error {
  constructor(value) {
    super();
    this.message = value;
  }
}
