pragma solidity 0.5.11;

contract celoContract {
    uint nextItemID;
    uint nextUserID;
    mapping(address => User) users;
    mapping(uint => Item) items;
    struct Item {
        uint ID;
        string Name;
        address sellerAddress;
        address buyerAddress;
        uint price; // Price is in decimal so $2.00 is 200 here
        bool received;
        address proxyAddress;
    }
    struct User {
        uint ID;
        string name;
        mapping(uint => Item) selling_items;
        uint num_selling_items;
        mapping(uint => Item) buying_items;
        uint num_buying_items;
   }
   function createUser(string memory name) public {
       User memory u = User({
           name: name,
           ID: nextUserID,
           num_selling_items: 0,
           num_buying_items: 0
        });
       nextUserID += 1;
       users[msg.sender] = u;
   }
   function createItem(string memory name, uint price) public {
       Item memory i = Item({
           ID: nextItemID,
           Name: name,
           sellerAddress: msg.sender,
           buyerAddress: msg.sender,
           price: price,
           received: false,
           proxyAddress: msg.sender
       });
       items[nextItemID] = i;
       nextItemID += 1;
       // TODO: associate item with user
    }
    function confirmItem(uint id) public {
        require(items[id].proxyAddress == msg.sender);
        items[id].received = true;
    }
    function buyItem(Item memory item) public payable {
         item.ID;
         msg.sender.transfer(item.price);
        // item added to user’s buying_items
        // item added to seller’s selling_items
    }
    function createProxy() public returns (uint){
        uint randomUserID = uint(keccak256(abi.encodePacked(now, msg.sender, now))) % nextUserID;
        return randomUserID;
    }
}
