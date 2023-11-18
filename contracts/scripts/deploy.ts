// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";
export async function verifyContract(
  contractAddress: string,
  constructorArguments: any
) {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Nexus = await ethers.getContractFactory("Nexus");
  // const nexus = await Nexus.deploy(
  //   "0x14630e0428B9BbA12896402257fa09035f9F7447"
  // );

  // await nexus.deployed();

  console.log("nexus deployed to:", nexus.address);
  verifyContract(nexus.address, ["0x14630e0428B9BbA12896402257fa09035f9F7447"]);

  const Bridge = await ethers.getContractFactory("BridgeTest");
  const bridge = await Bridge.deploy();
  console.log("bridge deployed to:", bridge.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
