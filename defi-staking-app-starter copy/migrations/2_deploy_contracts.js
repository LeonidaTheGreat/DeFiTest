const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {
    // deploy the Tether contract
   await deployer.deploy(Tether);
   const tether =  await Tether.deployed();

    // deploy the RWD contract
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    // deploy the Decentralbank contract
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    // transfer all RWD tokens to the DecentralBank
    await rwd.transfer( decentralBank.address, '1000000000000000000000000');

    //Distribute 100 Tether to investor
    await tether.transfer(accounts[1], '100000000000000000000')

}