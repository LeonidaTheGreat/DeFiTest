pragma solidity >=0.5.0;

contract Tether {
    string  public name = 'My Tether Token';
    string  public symbol = 'sUSDT';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million coins ( * 10^18 decimals)
    uint8   public decimals = 18;

    event TransferEvent(
        address indexed _from,
        address indexed _to,
        uint _value    
    );

    event ApprovalEvent(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function approve(address _sender, uint _value) public returns (bool success) {
        allowance[msg.sender][_sender] = _value;

        emit ApprovalEvent(msg.sender, _sender, _value);
        return true;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        // check that the balance of sender is bigger than value
        require(balanceOf[msg.sender] >= _value);

        // transfer funds and update balances
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // emit a transfer event
        emit TransferEvent(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // update the allowance of the sender
        allowance[_from][msg.sender] -= _value;

        emit TransferEvent(_from, _to, _value);
        return true;
    }

}

