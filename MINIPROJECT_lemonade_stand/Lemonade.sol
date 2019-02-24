pragma solidity ^0.4.24;

contract LemonadeStand {
    address owner;
    uint skuCount;
    enum State {ForSale, Sold, Shipped}
    
    struct Item {
        string name;
        uint sku;
        uint price;
        State state;
        address seller;
        address buyer;
        
    }
    mapping (uint => Item) items;
    
    event ForSale(uint skuCount);
    event Sold(uint sku);
    event Shipped(uint sku);
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier verifyCaller(address _address) {
        require(msg.sender ==  _address);
        _;
    }
    
    modifier paidEnough (uint _price) {
        require(msg.value >= _price);
        _;
    }
    
    modifier forSale (uint _sku) {
        require(items[_sku].state == State.ForSale);
        _;
    }

    modifier sold (uint _sku) {
        require(items[_sku].state == State.Sold);
        _;
    }
    
    constructor() public {
        owner = msg.sender;
        skuCount = 0;
    }
    
    function addItem(string _name, uint _price) onlyOwner public {
        skuCount = skuCount + 1;
        emit ForSale(skuCount);
        items[skuCount] = Item({
            name: _name,
            sku: skuCount,
            price: _price,
            state: State.ForSale,
            seller: msg.sender,
            buyer: 0
        });
    }
    
    function buyItem(uint sku) forSale(sku) paidEnough(items[sku].price) public payable {
        address buyer = msg.sender;
        uint price = items[sku].price;
        
        uint change = msg.value - price;
        buyer.transfer(change);
        
        items[sku].buyer = buyer;
        items[sku].state = State.Sold;
        items[sku].seller.transfer(price);
        emit Sold(sku);
    }
    
    function shipItem(uint sku) sold(sku) public {
        items[sku].state = State.Shipped;
        emit Shipped(sku);
    }
    
    function fetchItem(uint _sku) public view returns (string name, uint sku, uint price, string stateIs, address seller, address buyer) {
        uint state;
        name = items[_sku].name;
        sku = items[_sku].sku;
        price = items[_sku].price;
        state = uint(items[_sku].state);
        if( state == 0 ) {
            stateIs = "For Sale";
        }
        if( state == 1 ) {
            stateIs = "Sold";
        }
        if( state == 2 ) {
            stateIs = "Shipped";
        }        
        
        seller = items[_sku].seller;
        buyer = items[_sku].buyer;
    }
}

