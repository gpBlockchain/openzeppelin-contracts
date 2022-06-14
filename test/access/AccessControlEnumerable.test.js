const {
  shouldBehaveLikeAccessControl,
  shouldBehaveLikeAccessControlEnumerable,
} = require('./AccessControl.behavior.js');

const AccessControlMock = artifacts.require('AccessControlEnumerableMock');

contract('AccessControlEnum', function (accounts) {
  beforeEach(async function () {
    console.log('accounts[0]', accounts[0]);
    this.accessControl = await AccessControlMock.new({ from: accounts[0] });
  });

  shouldBehaveLikeAccessControl('AccessControl', ...accounts);
  shouldBehaveLikeAccessControlEnumerable('AccessControl', ...accounts);
});
