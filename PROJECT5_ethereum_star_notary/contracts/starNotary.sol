pragma solidity ^0.4.23;

import 'https://github.com/MarcusJones/OpenZeppelin2/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }
    
    // An offer to exchange is proposed, and stored in a struct
    // The following struct is over designed, it does not need so much information
    // but for development purposes, it contains all required info!
    struct ExchangeOffers {
        uint256 IDtokenOffered;
        uint256 IDtokenRequested;
        address offeredBy;
        address offeredTo;
        uint256 expiry; // (Not implemented, but it would be useful to specify how long the offer stands!)
        uint256 exchangePriceOffer; // (Not implemented, but you might want to offer additional ETH to incentivize someone to exchange)
        uint256 exchangePriceRequest; // (Not implemented, but you might want to request additional ETH to incentivize yourself to exchange)
    }
    
    // CRITERIA: The smart contract tokens should have a name and a symbol.
    string public name = "Galaxy";
    string public symbol = "GLXY";
    string public version = "4";

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    // The smart contract acts as a trusted clearing house for ExchangeOffers
    // The key of the mapping is the ID of the token requested (also stored in struct!) 
    mapping(address => ExchangeOffers) public ExchangeClearingHouse;

    function createStar(string _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

// Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
    function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns (string) {
        return tokenIdToStarInfo[_tokenId].name;
    }
//

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
      }

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.
    
    /* 
    */
    function offerExchange(uint256 _offeredTokenID, 
                           uint256 _requestedTokenID,
                           uint256 _timeOut,
                           uint256 _exchangePriceOffer,
                           uint256 exchangePriceRequest
                           ) public {
        require(_exists(_offeredTokenID));
        require(_exists(_requestedTokenID));
        
        address offeredOwner = ownerOf(_offeredTokenID);
        address requestedOwner = ownerOf(_requestedTokenID);
        
    }
    
    /* FOR DEVELOPMENT ONLY
    For debugging, ensure 2 tokens exist and get their owners
    */
    function checkExchangeAddresses(uint256 _tokenOneID, uint256 _tokenTwoID) public view returns (address, address){
        require(_exists(_tokenOneID));
        require(_exists(_tokenTwoID));
        
        address address1 = ownerOf(_tokenOneID);
        address address2 = ownerOf(_tokenTwoID);
        
        return(address1, address2);
    }

    /* FOR DEVELOPMENT ONLY
    FAILS, See note: `Requires the msg sender to be the owner, approved, or operator`
    Super naive and insecure, for debugging
    */
    function exchangeStarsNAIVE(uint256 _tokenOneID, uint256 _tokenTwoID) public {
        
        require(_exists(_tokenOneID));
        require(_exists(_tokenTwoID));
        
        require(msg.sender==ownerOf(_tokenOneID));
        
        address address1 = ownerOf(_tokenOneID);
        address address2 = ownerOf(_tokenTwoID, {from: address2});
        
        transferFrom(address1, address2, _tokenOneID);
        // The following line FAILS, since msg.sender != address2!!!
        //transferFrom(address2, address1, _tokenOneID);
    }
//

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
//

}
