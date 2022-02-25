async function main() {
  const [deployer] = await ethers.getSigners();
  const Contract = await ethers.getContractFactory("Arbitrage");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Arbitrage Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
