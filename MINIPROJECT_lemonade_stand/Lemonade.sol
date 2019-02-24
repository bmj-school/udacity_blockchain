pragma solidity ^0.4.24;

contract LemonadeStand {
    address owner;
    uint skuCount;
    enum State {ForSale, Sold}
    
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
}

