#/ 自动生成pom
# 自动生成config

HardhatConfigData = '''require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// const INFURA_PROJECT_ID = '719d739434254b88ac95d53e2b6ac997';

const argv = require('yargs/yargs')()
  .env('')
  .options({{
    ci: {{
      type: 'boolean',
      default: false,
    }},
    coverage: {{
      type: 'boolean',
      default: false,
    }},
    gas: {{
      alias: 'enableGasReport',
      type: 'boolean',
      default: false,
    }},
    mode: {{
      alias: 'compileMode',
      type: 'string',
      choices: ['production', 'development'],
      default: 'development',
    }},
    compiler: {{
      alias: 'compileVersion',
      type: 'string',
      default: '0.8.9',
    }},
    coinmarketcap: {{
      alias: 'coinmarketcapApiKey',
      type: 'string',
    }},
  }})
  .argv;

require('@nomiclabs/hardhat-truffle5');

if (argv.enableGasReport) {{
  require('hardhat-gas-reporter');
}}

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {{
  require(path.join(__dirname, 'hardhat', f));
}}

const withOptimizations = argv.enableGasReport || argv.compileMode === 'production';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {{
  solidity: {{
    version: argv.compiler,
    settings: {{
      optimizer: {{
        enabled: withOptimizations,
        runs: 200,
      }},
    }},
  }},
  defaultNetwork: 'testRpc',
  networks: {{
    hardhat: {{
      loggingEnabled: true,
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
    }},
    testRpc: {{
      url: process.env.TEST_RPC,
      // gas:10000000,
      accounts: {{
        mnemonic: process.env.MNEMONIC_STR,
        path: 'm/44\\\'/60\\\'/0\\\'/0',
        initialIndex: {idx},
        count: 10,
        passphrase: '',
      }},
    }},
  }},
  mocha: {{
    timeout: 100000,
    reporter: 'mochawesome',
    reporterOptions: {{
      reportFilename: '[status]-{contractName}-report',
    }},
  }},

}};

if (argv.coverage) {{
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}}
'''
ContractList = [
    "AccessControl",
    "AccessControlEnum",
    "Ownable",
    "CrossChainEnabled",
    "PaymentSplitter",
    "VestingWallet",
    "GovernorCompatibilityBravo",
    "GovernorComp",
    "GovernorERC721Mock",
    "GovernorPreventLateQuorum",
    "GovernorTimelockCompound",
    "GovernorTimelockControl",
    "GovernorVotesQuorumFraction",
    "GovernorWithParams",
    "Governor",
    "TimelockController",
    "Votes",
    "ERC2771Context",
    "MinimalForwarder",
    "BeaconProxy",
    "UpgradeableBeacon",
    "Clones",
    "ERC1967Proxy",
    "ProxyAdmin",
    "TransparentUpgradeableProxy",
    "Initializable",
    "UUPSUpgradeable",
    "Pausable",
    "PullPayment",
    "ReentrancyGuard",
    "ERC1155",
    "ERC1155Burnable",
    "ERC1155Pausable",
    "ERC1155Supply",
    "ERC1155URIStorage",
    "ERC1155PresetMinterPauser",
    "ERC1155Holder",
    "ERC20Test",
    "ERC20Permit",
    "ERC20Burnable",
    "ERC20Capped",
    "ERC20FlashMint",
    "ERC20Pausable",
    "ERC20Snapshot",
    "ERC20Votes",
    "ERC20VotesComp",
    "ERC20Wrapper",
    "ERC20PresetFixedSupply",
    "ERC20PresetMinterPauser",
    "SafeERC20",
    "TokenTimelock",
    "ERC721",
    "ERC721Enumerable",
    "ERC721Burnable",
    "ERC721Pausable",
    "ERC721Royalty",
    "ERC721URIStorage",
    "ERC721Votes",
    "ERC721PresetMinterPauserAutoId",
    "ERC721Holder",
    "ERC777",
    "ERC777PresetFixedSupply",
    "Address",
    "Arrays",
    "Strings",
    "Checkpoints",
    "Context",
    "Counters",
    "Create2",
    "EIP712",
    "ECDSA",
    "MerkleProof",
    "SignatureChecker",
    "ConditionalEscrow",
    "Escrow",
    "RefundEscrow",
    "ERC165",
    "ERC165Checker",
    "ERC165Storage",
    "ERC1820Implementer",
    "Math",
    "SafeCast",
    "SafeMath",
    "SignedMath",
    "SignedSafeMath",
    "MulticallToken",
    "StorageSlot",
    "BitMap",
    "DoubleEndedQueue",
    "EnumerableMap",
    "EnumerableSet",
    "TimersBlockNumber",
    "TimersTimestamp"
]
def auto_hardhat_config(contractName,idx):
    fileName = "hardhat.config.{contractName}.js".format(contractName = contractName)
    with open(fileName,'w') as f:
        f.write(HardhatConfigData.format(contractName = contractName,idx = idx))

def auto_cmd(contractName):
    f'''
    {contractName} =>
            "test:{contractName}": "hardhat test --config ./hardhat.config.{contractName}.js --grep \"Contract: {contractName} \"",
    :param contractName:
    :return:
    '''
    return '''"test:{contractName}": "hardhat test --config ./hardhat.config.{contractName}.js --network testRpc --grep \\\"Contract: {contractName} \\\"",'''.format(
        contractName = contractName
    )

def main_config():
    for idx in range(0,len(ContractList)):
        data = ContractList[idx]
        print(idx,data,idx % 5 *10)
        auto_hardhat_config(data,idx % 5 *10)

def main_cmd():
    for contractName in ContractList:
        print(auto_cmd(contractName))

if __name__ == '__main__':
    main_cmd()
