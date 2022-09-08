pragma solidity ^0.8.4;

contract Payment_system {

	event DistributeEvent (uint _amount, string indexed testId, address indexed _from);
	event Deposit (uint indexed _amount, string indexed testId, address indexed _from);

	event Publish ( string indexed testId, string resultHash);

    address payable owner;

	mapping ( address => uint ) public balances;
	mapping ( string => string ) public results;

    constructor() {
     owner = payable (msg.sender);
    }

	receive() external payable {}

	function depositFrom (string calldata testId, address receiver, uint newBalance) external payable returns (uint) 
	{

     balances[receiver] = newBalance + balances[receiver];
	 
     emit Deposit ( msg.value, testId, msg.sender);

	 return balances[receiver];

	}

	function userWithdraw() external  {

	 	uint bal = balances[msg.sender];
		require(bal > 0);
		balances[msg.sender] = 0;	
		payable(msg.sender).transfer(bal);	
	
	}

	function withdraw(uint256 _amount) external {

	 	require ( msg.sender == owner, "Unauthorized for this call");		
	    payable(msg.sender).transfer(_amount);	
	
	}

	function publishResults( string memory testId, string memory resultHash) external {

		emit Publish ( testId, resultHash);
	    		
	}

    function getBalance() public view returns (uint) {

	 	return address(this).balance;
	
	}

	function getUserBalance(address user) public view returns (uint) {

	 	return balances[user];
	
	}

	function selfDestruct() external {

		require (msg.sender == owner, "Not owner");
		selfdestruct (payable(msg.sender));

	}
}

