const main = async () => {

  const Payment_system = await hre.ethers.getContractFactory("Payment_system");
  const payment_system = await Payment_system.deploy();

  await payment_system.deployed();

  console.log("Contract deployed to:", payment_system.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  }
  catch (error) {
    console.error(error);
    process.exit(1);

  }
}

runMain();
