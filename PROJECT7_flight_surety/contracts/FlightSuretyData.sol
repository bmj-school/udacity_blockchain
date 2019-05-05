pragma solidity ^0.4.25;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    mapping(address => bool) private authorizedContracts;


    /* AIRLINES
    Each airline is represented by their public address
    */
    enum RegistrationState 
    { 
        Proposed,  // 0
        Voted,  // 1
        Registered     // 2
        // ForSale,    // 3
        // Sold,       // 4
        // Shipped,    // 5
        // Received,   // 6
        // Purchased   // 7
        }
    struct Airline {
        string name;
        // uint8 statusCode;
        // uint256 updatedTimestamp;        
        address airlineAddress;
        bool approved; // This is set to True for the first 4 airlines, and then by voting
        address[] votes; // This is the list of airlines who have voted this airline in
    }

    mapping(address => Airline) private airlines;
    address[] airlineAddresses;


    /* FLIGHTS
    */
    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;        
        address airline;
    }
    mapping(bytes32 => Flight) private flights;
    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/
    event AirlineRegistered(address airlineAddress, string name, bool approved, uint256 votes);

    /********************************************************************************************/
    /*                                       CONSTUCTOR                                         */
    /********************************************************************************************/

    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    *      The deploying account must register the first airline
    */
    constructor ( string _airlineName, address _airlineAddress) public 
    {
        contractOwner = msg.sender;

        // Create first Airline 
        airlines[_airlineAddress] = Airline({
            name: _airlineName, 
            airlineAddress: _airlineAddress,
            approved: true,
            votes: new address[](0)
            });        
        airlineAddresses.push(_airlineAddress);
        // emit AirlineRegistered(_airlineAddress, _airlineName);

        // registerAirline(_airlineName, _airlineAddress);
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /**
    * @dev Modifier that requires function caller to be authorized caller.
    */
    modifier requireCallerAuthorized()
    {
        require(authorizedContracts[msg.sender] == true, "Caller is not authorized caller");
        _;
    }

    /**
     * Modifier that requires an airline to be registered.
     */
    modifier requireAirlineExists(address _airlineAddress)
    {
        bool exists = addressInList(airlineAddresses, _airlineAddress);
        require(exists, "Airline address does not exist in this contract");
        _;
    }    
    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */      
    function isOperational() 
                            public 
                            view 
                            returns(bool) 
    {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */    
    function setOperatingStatus
                            (
                                bool mode
                            ) 
                            external
                            requireContractOwner 
    {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   
    function registerAirline ( string _airlineName, address _airlineAddress) external
    {
        // Case 1: Only existing airlines can register new airlines
        if (airlineAddresses.length <= 4){
            require(addressInList(airlineAddresses, msg.sender), 'Only existing airlines can register new');
            airlines[_airlineAddress] = Airline({
                name: _airlineName, 
                airlineAddress: _airlineAddress,
                approved: true,
                votes: new address[](0)
                });        
            airlineAddresses.push(_airlineAddress);
            emit AirlineRegistered(_airlineAddress, _airlineName, airlines[_airlineAddress].approved, airlines[_airlineAddress].votes.length);
        } else if (airlineAddresses.length > 4) {
            
        }
    }

    function getNumAirlines ( )
        external
        view
        returns(uint airlineCount)
    {
        return airlineAddresses.length;
    }

    function getAirline ( address _address )  external view requireAirlineExists(_address) returns(string, address, bool, uint256)  {
        return (airlines[_address].name, airlines[_address].airlineAddress, airlines[_address].approved, airlines[_address].votes.length);
    }

   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (                             
                            )
                            external
                            payable
    {

    }

    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                )
                                external
                                pure
    {
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                            )
                            external
                            pure
    {
    }

   /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */   
    function fund
                            (   
                            )
                            public
                            payable
    {
    }

    function getFlightKey
                        (
                            address airline,
                            string memory flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
                            external 
                            payable 
    {
        fund();
    }

    /** MJ
    * @dev 
    */   
    function authorizeCaller
                            (
                                address contractAddress
                            )
                            external
                            requireContractOwner
    {
        authorizedContracts[contractAddress] = true;
    }

    /** MJ
    * @dev 
    */   
    function deauthorizeCaller
                            (
                                address contractAddress
                            )
                            external
                            requireContractOwner
    {
        delete authorizedContracts[contractAddress];
    }


    /**
    * @dev This checks if an address appears in the list of addresses.
    */ 
    function addressInList ( address[] memory addresses, address addressToCheck) internal pure returns(bool)
    {
        bool exists = false;
        for(uint c = 0; c < addresses.length; c++) {
            if (addresses[c] == addressToCheck) {
                exists = true;
                break;
            }
        }
        return exists;
    }

}

