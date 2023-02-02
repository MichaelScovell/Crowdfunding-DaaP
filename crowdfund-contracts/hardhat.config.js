/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'goreli',
    networks: {
      hardhat: {},
      goerli: {
        url: process.env.GOERLI_RPC_URL,
        accounts: [process.env.MW_PRIVATE_KEY]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
