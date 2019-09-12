import { assert } from 'chai';
import defaultModule from '../src/index';

describe('Awesome test.', () => {
  it('should test default angular module', () => {
    const expectedVal = null;
    assert(defaultModule !== expectedVal, 'Default is not null :(');
  });
});
