const hre = require("hardhat")
const fs = require('fs')
const UUPSUpgradeable = require('@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json')
const status = require('../status.json')

async function main() {
  await hre.run('compile')

  const MyToken_v2 = await hre.ethers.getContractFactory("MyToken_v2")
  const myToken_v2 = await MyToken_v2.deploy()
  console.log("MyToken 2.0 deployed to:", myToken_v2.address)

  const proxy = await hre.ethers.getContractAt(UUPSUpgradeable.abi, status.proxyAddress)
  await proxy.upgradeTo(myToken_v2.address)
  console.log("Proxy upgraded to:", myToken_v2.address)

  fs.writeFileSync('./status.json', JSON.stringify({ ...status, myToken_v2Address: myToken_v2.address }, "", 2))

  const [deployer] = await hre.ethers.getSigners()
  const address = await deployer.getAddress()
  const proxiedMyToken = await hre.ethers.getContractAt("MyToken_v2", status.proxyAddress)
  await proxiedMyToken.safeMint(address, 1)
  console.log(`Minted Token #1 to ${address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
