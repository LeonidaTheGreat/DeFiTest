const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should();

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }

    before(async () => {
        //load smart contracts
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // transfer all reward tokens to the bank
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // transfer 100 myTether tokens to the investor
        await tether.transfer(customer, tokens('100'), {from: owner});
    })

    // the code for testing goes here
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'My Tether Token')
        })
    })

    describe('RWD Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name();
            assert.equal(name, 'My Reward Token')
        })
    })

    describe('Decentralbank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        let result
        it('verifies customer tokens for staking', async () => {
            
            // check balance of customer (investor)
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer myTether balance before staking 100 tokens')
        })

        it('transfers tokens for staking', async () => {
            // check staking for customer
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('50'), {from: customer})
            await decentralBank.depositTokens(tokens('50'), {from: customer})
        })

        it('the customer has staked tokens', async () => {
            // check updated balance of customers
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer myTether balance after staking 100 tokens')
        })

        it('the decentral bank has the staked tokens', async () => {
            // check updated balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'bank myTether balance after staking from customer')
        })

        it('customer is staking', async () => {
            // is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer staking status is true')

        })

        it('rewards tokens for staking', async () => {
            // is staking balance
            await decentralBank.issueRewards({from: owner})
            result = await rwd.balanceOf(customer)
            assert.equal(result.toString(), tokens('10'), 'customer has received his reward tokens')

        })

        it('only owner can issue rewards', async () => {
            await decentralBank.issueRewards({from: customer}).should.be.rejected;

        })

        it('customer has his mTether back', async () => {
            // 
            await decentralBank.unstakeTokens({from: customer})
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer has received his mTether back')

        })

        it('customer has unstaked', async () => {
            // 
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer staking status is false')
        })


        it('the decentral bank doesn\'t have the staked tokens anymore', async () => {
            // check updated balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'bank myTether balance after staking from customer')
        })

    })
})