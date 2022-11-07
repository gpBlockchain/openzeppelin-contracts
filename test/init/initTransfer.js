const { ethers } = require('hardhat');
const { Wallet } = require('ethers');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const TRANSFER_ETHER = process.env.TRANSFER_ETHER;
const CKB_PROXY_ADDRESS = process.env.CKB_PROXY_ADDRESS;
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

async function initWithParam () {
  console.log('init');
  const signer = await ethers.getSigners();
  const waitList = [];
  for (let i = 0; i < signer.length; i++) {
    const aa = transferCkb(PRIVATE_KEY, i, signer[i].address, ethers.utils.parseEther(TRANSFER_ETHER));
    waitList.push(aa);
    await sleep(100);
  }
  for (let i = 0; i < waitList.length; i++) {
    await waitList[i];
  }
  return true;
}

async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function transferCkb(privateKey, idx, to, value){

  const provider = (await ethers.getSigners())[idx].provider;
  if (provider === undefined) {
    console.log('provider is undefined');
    return;
  }

  if ((await provider.getBalance(to)).sub(value).gte('0')) {
    return;
  }
  // init sign
  let wt = new Wallet(privateKey);
  wt = await wt.connect(provider);
  
  //get payload
  console.log('------')
  while (true) {
    try {
      const tx = await wt.sendTransaction({
        to: to,
        value:value,
      });
      await tx.wait();
      if ((await provider.getBalance(to)).sub(value).gte('0')) {
        return;
      }
    } catch (e) {
      console.log('e:', e.toString());
    }
  }}

async function transfer (privateKey, idx, to, value) {
  const provider = (await ethers.getSigners())[idx].provider;
  if (provider === undefined) {
    console.log('provider is undefined');
    return;
  }

  if ((await provider.getBalance(to)).sub(value).gte('0')) {
    return;
  }
  // init sign
  let wt = new Wallet(privateKey);
  wt = await wt.connect(provider);

  while (true) {
    try {
      const tx = await wt.sendTransaction({
        to: to,
        value: value,
      });
      await tx.wait();
      if ((await provider.getBalance(to)).sub(value).gte('0')) {
        return;
      }
    } catch (e) {
      console.log('e:', e.toString());
    }
  }
}
