import { assert } from 'chai';
import angularjsJwtModule from '../src/index';

describe('Main Module', () => {
  it('should test default angular module', () => {
    assert(angularjsJwtModule.name === 'angularjs-jwt', 'Default module name must be "angularjs-jwt" :(');
  });
});
