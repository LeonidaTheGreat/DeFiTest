pragma solidity >=0.5.0;

import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;

    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping (address => uint) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        // only deposit if amount is greater than 0
        require(_amount > 0, 'amount needs to be greater than 0 in order to stake');

        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // updating staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    function issueRewards() public {
        // ensure only the owner can be calling this
        require(msg.sender == owner, 'caller must be the owner');

        // issue tokens to all stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint reward = stakingBalance[recipient]/10;

            if (reward > 0) {
                rwd.transfer(recipient, reward);
            }
        }
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0);

        // transfer the tokens back to the user
        tether.transfer(msg.sender, balance);

        // update stakign balance
        stakingBalance[msg.sender] = 0;

        //update status
        isStaking[msg.sender] = false;
    }
}