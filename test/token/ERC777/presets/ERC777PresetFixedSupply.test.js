const { BN, singletons } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

const ERC777PresetFixedSupply = artifacts.require('ERC777PresetFixedSupply');

contract('ERC777PresetFixedSupply', function (accounts) {
  const [registryFunder, owner, defaultOperatorA, defaultOperatorB, anyone] = accounts;

  const initialSupply = new BN('10000');
  const name = 'ERC777Preset';
  const symbol = '777P';

  const defaultOperators = [defaultOperatorA, defaultOperatorB];

  before(async function () {
    // todo skip
    // await singletons.ERC1820Registry(registryFunder);
  });

  beforeEach(async function () {
    this.token = await ERC777PresetFixedSupply.new(name, symbol, defaultOperators, initialSupply, owner);
  });

  it.skip('returns the name' +
    '(godwoken not support transfer eoa)', async function () {
    expect(await this.token.name()).to.equal(name);
  });

  it.skip('returns the symbol' +
    '(godwoken not support transfer eoa)', async function () {
    expect(await this.token.symbol()).to.equal(symbol);
  });

  it.skip('returns the default operators' +
    '(godwoken not support transfer eoa)', async function () {
    expect(await this.token.defaultOperators()).to.deep.equal(defaultOperators);
  });

  it.skip('default operators are operators for all accounts' +
    '(godwoken not support transfer eoa)', async function () {
    for (const operator of defaultOperators) {
      expect(await this.token.isOperatorFor(operator, anyone)).to.equal(true);
    }
  });

  it.skip('returns the total supply equal to initial supply' +
    '(godwoken not support transfer eoa)', async function () {
    expect(await this.token.totalSupply()).to.be.bignumber.equal(initialSupply);
  });

  it.skip('returns the balance of owner equal to initial supply' +
    '(godwoken not support transfer eoa)', async function () {
    expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(initialSupply);
  });
});
