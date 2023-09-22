const { ethers } = require('hardhat');
const { Wallet } = require('ethers');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const TRANSFER_ETHER = process.env.TRANSFER_ETHER;

describe('Transfer', function () {
  this.timeout(1000000);
  it('initAccount', async () => {
    await initWithParam();
    console.log('init finish');
    const signers = await ethers.getSigners();
    console.log('account length:', signers.length);
    const waitList = [];
    for (let i = 0; i < signers.length; i++) {
      const balance = signers[0].provider.getBalance(signers[i].address);
      waitList.push({ address: signers[i].address, balance: balance });
      await sleep(50);
    }
    for (let i = 0; i < waitList.length; i++) {
      console.log('idx:', i, ' address:', waitList[i].address, ' balance:', (await waitList[i].balance).toString());
    }
  });
});

async function initWithParam() {
  console.log('init');
  const signer = await ethers.getSigners();
  const waitList = [];
  const provider = (await ethers.getSigners())[0].provider;
  if (!provider) {
    console.log('Provider is undefined');
    return;
  }

  let wt = new Wallet(PRIVATE_KEY);
  wt = wt.connect(provider);
  const baseNonce = await provider.getTransactionCount(wt.address);
  let j = 0;
  const transferValue = ethers.utils.parseEther(TRANSFER_ETHER);

  for (let i = 0; i < signer.length; i++) {
    const currentBalance = await provider.getBalance(signer[i].address);
    if (currentBalance.sub(transferValue).lt(ethers.BigNumber.from('0'))) {
      const currentNonce = baseNonce + j;
      const aa = transfer(wt, i, signer[i].address, transferValue, currentNonce);
      waitList.push(aa);
      j++;
    }
    await sleep(100);
  }
  for (let i = 0; i < waitList.length; i++) {
    await waitList[i];
  }
  return true;
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function transfer(wt, idx, to, value, currentNonce) {
  const provider = (await ethers.getSigners())[idx].provider;
  if (provider == undefined) {
    console.log('provider is undefined');
    return;
  }

  const MAX_RETRIES = 50;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const tx = await wt.sendTransaction({
        to: to,
        value: value,
        nonce: currentNonce
      });
      await tx.wait();
      return;
    } catch (e) {
      console.log('e:', e.toString());
    }
    attempt++;
  }
  throw new Error('Failed to transfer after ' + MAX_RETRIES + ' attempts.');
}
