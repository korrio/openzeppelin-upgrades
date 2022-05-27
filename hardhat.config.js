require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
// require('@vechain.energy/hardhat-thor')

const infuraProjectId = "";
const privateKey = [""];

module.exports = {
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: "rinkeby",
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
            accounts: privateKey,
            // saveDeployments: true,
        },
        // vechain: {
        //   url: 'https://testnet.veblocks.net',
        //   privateKey: privateKey[0],
        //   delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
        //   blockGasLimit: 10000000
        // }
    }
};