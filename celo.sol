pragma solidity 0.5.11;

contract CeloContract {
	uint public nextItemID = 0;
	int public countUser = 0;
    mapping(address => User) users;
    mapping(int => address) userInts;
    mapping(uint => Item) public items;
    //amount of time after seller accepts the sale that the buyer cannot challenge that they have not received the item
	uint constant public waitPeriod = 30 seconds;
    //amount of time the buyer has to challenge that they have not received the item, starting after the wait period is over
	uint constant public challengePeriod = 30 seconds;
	//amount of time seller has to accept the sale
    uint constant public sellerAcceptPeriod = 30 seconds;
  //amount of time the seller has to challenge that their item is not received, starting after buyer challenges
    uint constant public sellerChallengePeriod = 30 seconds;
    mapping(address => bool) public userExists;

	struct Item {
        uint ID;
        address payable sellerAddress;
        address buyerAddress;
        uint price;
        bool received;
        address mediatorAddress;
        uint buyTime;
        uint sellerAcceptTime;
        uint challengeTime;
        bool claimNonreceived;
        bool sellerAcceptNonReceived;
        bool challengeNonreceived;
        address challengeWinner;
    }

    struct User {
        uint[] sellingItems;
        uint[] buyingItems;
   }

   function createUser() public {
        require(!userExists[msg.sender], 'You already exist!');
        // USE SAFEMATH
        User memory u = User({
            buyingItems: new uint[](0),
            sellingItems: new uint[](0)
        });
       users[msg.sender] = u;
       userExists[msg.sender] = true;
       userInts[countUser] = msg.sender;
       countUser += 1;
   }

   function createItem(uint price) public { // TODO: check visibility
       Item memory i = Item({
           ID: nextItemID,
           sellerAddress: msg.sender,
           buyerAddress: address(0),
           price: price,
           received: false,
           mediatorAddress: address(0),
           buyTime: 0,
           challengeTime: 0,
           sellerAcceptTime: 0,
           claimNonreceived: false,
           sellerAcceptNonReceived: false,
           challengeNonreceived: false,
           challengeWinner: address(0)
       });
       users[msg.sender].sellingItems.push(nextItemID);
       items[nextItemID] = i;
       nextItemID += 1;
    }

    //check whether access to this function must be constricted
    function buyItem(uint id, int randomUser) public payable {
        require(items[id].buyerAddress == address(0));
        require(id < nextItemID);
        require(msg.value == items[id].price); //what happens if someone calls this with a nonexistent id?
        items[id].buyerAddress = msg.sender;
        users[msg.sender].buyingItems.push(id);
        if (randomUser == -1) {
            items[id].mediatorAddress = address(0);
        } else {
            items[id].mediatorAddress = userInts[randomUser];
        }
        items[id].buyTime = now;
    }

    function sellerAcceptSale (uint id) public {
    	require(items[id].buyerAddress != address(0));
    	require(items[id].sellerAddress == msg.sender);
    	require(now - items[id].buyTime < sellerAcceptPeriod);
    	require(items[id].sellerAcceptTime == 0);
        items[id].sellerAcceptTime = now;
    }

    function buyerConfirmsReceived (uint id) public {
        require(msg.sender == items[id].buyerAddress);
        require(!items[id].claimNonreceived);
        require(!items[id].received);
        items[id].received = true;
    }

    function buyerClaimsNonReceived (uint id) public {
        require(items[id].mediatorAddress != address(0));
        require(msg.sender == items[id].buyerAddress);
        require(now - items[id].sellerAcceptTime > waitPeriod);
        require(!items[id].received);
        require(!items[id].claimNonreceived);
        items[id].claimNonreceived = true;
        items[id].challengeTime = now;
    }

    function sellerAcceptNonReceived (uint id) public {
    	require(items[id].sellerAddress == msg.sender);
    	require(items[id].buyerAddress != address(0));
        require(items[id].claimNonreceived);
        require(!items[id].challengeNonreceived);
       	items[id].sellerAcceptNonReceived = true;
    }

    function sellerChallengeNonReceived (uint id) public {
        require(items[id].sellerAddress == msg.sender);
    	require(items[id].buyerAddress != address(0));
        require(items[id].claimNonreceived);
        require(!items[id].sellerAcceptNonReceived);
        require(now - items[id].challengeTime < sellerChallengePeriod);
        items[id].challengeNonreceived = true;
    }

    function mediatorSettlesChallenge (uint id, bool favorSeller) public {
    	require (items[id].challengeNonreceived);
    	require (msg.sender == items[id].mediatorAddress);
        require (items[id].challengeWinner == address(0));
        if (favorSeller) {
        	items[id].challengeWinner = items[id].sellerAddress;
        } else {
        	items[id].challengeWinner = items[id].buyerAddress;
        }
    }

    function sellerRedeem(uint id) public {
    	require(items[id].buyerAddress != address(0));
        require(msg.sender == items[id].sellerAddress);
        require(
            items[id].received ||
            (
                now - items[id].sellerAcceptTime > waitPeriod + challengePeriod &&
                !items[id].claimNonreceived
            ) ||
            items[id].challengeWinner == items[id].sellerAddress
        );
        msg.sender.transfer(items[id].price);
        items[id].sellerAddress = address(0);
    }

    function buyerWithdraw(uint id) public {
        require(items[id].sellerAddress != address(0));
        require(msg.sender == items[id].buyerAddress);
        require(
            items[id].sellerAcceptNonReceived ||
            (
                now - items[id].sellerAcceptTime > waitPeriod + items[id].challengeTime + sellerChallengePeriod &&
                items[id].claimNonreceived &&
                !items[id].challengeNonreceived
            ) ||
            items[id].challengeWinner == items[id].buyerAddress
        );
        msg.sender.transfer(items[id].price);
        items[id].buyerAddress = address(0);
    }

    function getSellingItems(address _user) public view returns (uint[] memory) {
        return users[_user].sellingItems;
    }

    function getBuyingItems(address _user) public view returns (uint[] memory) {
        return users[_user].buyingItems;
    }
}
