import { expect } from 'chai';
import methods from '../src/app';

describe('methods isNumValid()', () => {
  it('should return true for a number in between 10 and 70', () => expect(methods.isNumValid(39)).to.be.true);
  it('should return false when the number is less than or equal to 10', () => expect(methods.isNumValid(10)).to.be.false);
  it('should return false when the number is greater than or equal to 70', () => expect(methods.isNumValid(79)).to.be.false);
});
describe('hello function', () => {
  it('should return Hello', (done) => {
    expect(methods.sayHello()).to.equal('Hello');
    done();
  });
});
