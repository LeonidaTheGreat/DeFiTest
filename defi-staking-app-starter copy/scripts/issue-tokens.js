const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function IssueTokens(callback) {
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueRewards()
    console.log('tokens have been issued')
    callback()
}

