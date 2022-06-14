/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.9)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

const fs = require('fs');
const path = require('path');

// const INFURA_PROJECT_ID = '719d739434254b88ac95d53e2b6ac997';

// eth_address: 0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73
const PRIVATE_KEY = 'dd50cac37ec6dd12539a968c1a2cbedda75bd8724f7bcad486548eaabb87fc8b';

// 0xb243e6840E99d6Fd89e5075b0e1D3EFA810cF653
const PRIVATE_KEY2 = '8792b6c208c4a7ef59b043c534b34aa95763fb995751bdb0a757b7a1b6d7d7b4';

// eth_address: 0x934F1EbCB57ce1D9985A4c4f8811D17B04342067
const PRIVATE_KEY3 = '31227350280dbcb27d2976c900faf62ce92c2ad0b982541cc837fb9236b3b415';

// eth_address: 0xC4A4281378FE711d2e02480Cb7568952EB249fdF
const PRIVATE_KEY4 = '9269aa582ad09351383b32e7981f84f6efa5f94a9322813f63894caff74166a0';

// eth_address: 0x6B75801d17BcB7dbA0bDfE1d989e49A722e020e6
const PRIVATE_KEY5 = 'b7900989d6fa12c9048e331eeb7f4cb34f224a5cb951ab88a8a289fddc3bec91';

// eth_address: 0x8974eD1cfA93B1E28E11005E3eA88AF81452113a
const PRIVATE_KEY6 = '7645889bd8772bad4daeca099a72c90e476865d1f06275dbbc5cad1e3259163a';

// eth_address : 0xc3D225e6c52484E7524f79c28faEcf3AecE7AB10
const PRIVATE_KEY7 = '187a4175a31648c7fb351876b302a822e788b4ae3be60c92b95dff292542c52a';

// eth_address : 0x430559Efb81e06E04d5a98899291978Cde6f44D2
const PRIVATE_KEY8 = 'e785d4075e1178e4c6c77ef25f513e5dc248faad9a08f73d36f90f628c23b025';

// eth_address : 0xB9dDA6ab27789eC40976e9DA395E754c961d8a99
const PRIVATE_KEY9 = '1f2ecce38923ff112e527ea2a073bff2f6fa286f7efb7916c4d28fd9a022ec0b';

// eth_address : 0x14d03dC2f2ac1a89Ed46472Cc1BcF85D02F1C4EE
const PRIVATE_KEY10 = '558ddfe8271ad72ae84d9223f673f2c684b3e01e66fcb075324144e9808a45d7';

const argv = require('yargs/yargs')()
  .env('')
  .options({
    ci: {
      type: 'boolean',
      default: false,
    },
    coverage: {
      type: 'boolean',
      default: false,
    },
    gas: {
      alias: 'enableGasReport',
      type: 'boolean',
      default: false,
    },
    mode: {
      alias: 'compileMode',
      type: 'string',
      choices: ['production', 'development'],
      default: 'development',
    },
    compiler: {
      alias: 'compileVersion',
      type: 'string',
      default: '0.8.9',
    },
    coinmarketcap: {
      alias: 'coinmarketcapApiKey',
      type: 'string',
    },
  })
  .argv;

require('@nomiclabs/hardhat-truffle5');

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
  require(path.join(__dirname, 'hardhat', f));
}

const withOptimizations = argv.enableGasReport || argv.compileMode === 'production';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: argv.compiler,
    settings: {
      optimizer: {
        enabled: withOptimizations,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      loggingEnabled: true,
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
    },
    gwTestnetV1: {
      url: 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev',
      // gasMultiplier: 2,
      accounts: [`0x${PRIVATE_KEY}`,
        `0x${PRIVATE_KEY2}`,
        `0x${PRIVATE_KEY3}`,
        `0x${PRIVATE_KEY4}`,
        `0x${PRIVATE_KEY5}`,
        `0x${PRIVATE_KEY6}`,
        `0x${PRIVATE_KEY7}`,
        `0x${PRIVATE_KEY8}`,
        `0x${PRIVATE_KEY9}`,
        `0x${PRIVATE_KEY10}`],
    },
    gwBetanetTestnetV1: {
      url: `https://godwoken-betanet-v1.ckbapp.dev`,
      // gasMultiplier: 3,
      accounts: [`0x${PRIVATE_KEY}`,
        `0x${PRIVATE_KEY2}`,
        `0x${PRIVATE_KEY3}`,
        `0x${PRIVATE_KEY4}`,
        `0x${PRIVATE_KEY5}`,
        `0x${PRIVATE_KEY6}`,
        `0x${PRIVATE_KEY7}`,
        `0x${PRIVATE_KEY8}`,
        `0x${PRIVATE_KEY9}`,
        `0x${PRIVATE_KEY10}`],
    },
    gwTestNetLocalV1: {
      url: 'http://127.0.0.1:8024',
      gasMultiplier: 2,
      accounts: [`0x${PRIVATE_KEY}`,
        `0x${PRIVATE_KEY2}`,
        `0x${PRIVATE_KEY3}`,
        `0x${PRIVATE_KEY4}`,
        `0x${PRIVATE_KEY5}`,
        `0x${PRIVATE_KEY6}`,
        `0x${PRIVATE_KEY7}`,
        `0x${PRIVATE_KEY8}`,
        `0x${PRIVATE_KEY9}`,
        `0x${PRIVATE_KEY10}`],
    },
    bscTest: {
      // url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      url: 'https://rinkeby.infura.io/v3/719d739434254b88ac95d53e2b6ac997',
      accounts: [`0x${PRIVATE_KEY}`,
        `0x${PRIVATE_KEY2}`,
        `0x${PRIVATE_KEY3}`,
        `0x${PRIVATE_KEY4}`,
        `0x${PRIVATE_KEY5}`,
        `0x${PRIVATE_KEY6}`,
        `0x${PRIVATE_KEY7}`,
        `0x${PRIVATE_KEY8}`,
        `0x${PRIVATE_KEY9}`,
        `0x${PRIVATE_KEY10}`],
    },
    ethLocal: {
      url: 'http://127.0.0.1:8545',
      accounts: [`0x${PRIVATE_KEY}`,
        `0x${PRIVATE_KEY2}`,
        `0x${PRIVATE_KEY3}`,
        `0x${PRIVATE_KEY4}`,
        `0x${PRIVATE_KEY5}`],
    },
  },
  // defaultNetwork: 'gwTestnetV1',

  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    coinmarketcap: argv.coinmarketcap,
  },
  mocha: {
    timeout: 100000,
    reporter: 'mochawesome',
  }

};

if (argv.coverage) {
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}
// proxy: {
//   protocol: 'https',
//     host: '127.0.0.1',
//     port: 9000,
//     auth: {
//     username: 'mikeymike',
//       password: 'rapunz3l'
//   }
// },

// extendEnvironment((hre) => {
//   const Web3 = require('web3');
//   const HttpProxyAgent = require('http-proxy-agent');
//   console.log('-----web3--init-----');
//   // hre.network.provider is an EIP1193-compatible provider.
//   // hre.web3 = new Web3(hre.network.provider);
//   // this.web3Provider.httpAgent = new HttpProxyAgent(process.env.HTTP_PROXY)
//   // hre.web3.currentProvider.agent = new HttpProxyAgent('http://localhost:5555');
//   // hre.web3.eth.subscribe('logs', options [, callback]);
//   console.log('-----web3--end-----');
// });
