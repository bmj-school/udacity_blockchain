pragma solidity ^0.4.25;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    AirlineData airlineData;
    FlightData flightData;
    PassengerData passengerData;

    uint public AIRLINE_FUNDING_AMOUNT = 10 ether;       
    uint256 public constant MAX_INSURANCE_AMOUNT = 1 ether;

    uint public AIRLINE_FUNDING_AMOUNT = 10 ether;       

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Flight status codees
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address private contractOwner;          // Account used to deploy contract

<<<<<<< HEAD
    struct Passenger {
        address addr;
        bool isRegistered;
        uint bought;
        uint payout;
        bytes32 flightKey;
    }
    mapping(address => Passenger) public passengers;


    // struct Insurance {
    //     uint256 paidAmount;                     
    //     bool payoutReceived;                    
    //     address buyerAddress;                   
    // }
    // // Track paid insurances
    // mapping(bytes32 => Insurance[]) private insurances;
    
=======
    // struct Airline {
    //     string name;
    //     address airlineAddress;
    //     uint registrationState; 
    //     address[] votes; 
    // }
>>>>>>> upstream/master

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/
    event AirlineRegisteredApp(address airlineAddress, uint registrationState, uint256 numVotes);
    event AirlineProposed(address airlineAddress, string name, address sponsor);
    event VotedIn(address airlineAddress);
    event AirlineFunded(address airlineAddress);
<<<<<<< HEAD
    event FlightRegistered(bytes32 flightKey, address airline, string name, uint256 departureTime);
=======

>>>>>>> upstream/master

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
         // Modify to call data contract's status
        require(true, "Contract is currently not operational");
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

    modifier requireSufficientFund() {
        require(msg.value >= AIRLINE_FUNDING_AMOUNT, "Minimum funding level not met");
        _;
    }
    
<<<<<<< HEAD
    /**
     * Modifier that requires an airline to be registered.
     */
    modifier requireAirlineFunded(address _airlineAddress)
    {
        require(airlineData.isAirlineFunded(_airlineAddress), "Airline address does not exist or not funded");
        _;
    }


    modifier requireInsuranceAmount ( uint256 amount)
    {  
        require(amount > 0 && amount <= MAX_INSURANCE_AMOUNT, "Max insurance amount is 1 ETH.");
        _;
    }
=======
>>>>>>> upstream/master

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
    * @dev Contract constructor
    *
    */
    constructor(address address_airlineData, address address_flightData, address address_passengerData) public
    {
        contractOwner = msg.sender;
        airlineData = AirlineData(address_airlineData);
        flightData = FlightData(address_flightData);
        passengerData = PassengerData(address_passengerData);

    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational() public pure returns(bool)
    {
        return true;  // Modify to call data contract's status
    }

    /********************************************************************************************/
    /* AIRLINES
    /********************************************************************************************/


   /**
    * @dev Add an airline to the registration queue
    *
    */
    function registerAirline (string _airlineName, address _airlineAddress) external requireIsOperational returns(bool success, uint256 votes)
    {
        airlineData.registerAirlineData(msg.sender, _airlineName, _airlineAddress);

        // string thisName = "TODO FIX";
        address thisAddress;
        uint thisState;
        uint256 thisVotes;
        
        // (thisAddress, thisName, thisState, thisVotes) = airlineData.getAirline(_airlineAddress);
        (, thisAddress, thisState, thisVotes) = airlineData.getAirline(_airlineAddress); // string, address, uint, uint256 
        emit AirlineRegisteredApp(
            thisAddress,
            thisState,
            thisVotes
        );

        return (success, 0);
    }

    function vote(address newAirline) external requireIsOperational
    {
        airlineData.vote(msg.sender, newAirline);
    }    

    function fund() public payable requireIsOperational requireSufficientFund
    {
        // address(flightSuretyData).transfer(msg.value);
        airlineData.fundAirline(msg.sender);
    }

<<<<<<< HEAD
    /********************************************************************************************/
    /* PASSENGERS
    /********************************************************************************************/
    function registerPassenger() external  {
        // msg.sender;
    }

    function getPassenger(address passengerAddress) external view 
        returns (address, bool, uint, uint, bytes32)
    {
        return (
            passengers[passengerAddress].addr,
            passengers[passengerAddress].isRegistered,
            passengers[passengerAddress].bought,
            passengers[passengerAddress].payout,
            passengers[passengerAddress].flightKey
        );
    }
=======
>>>>>>> upstream/master

   /**
    * @dev Buy insurance for a flight
    *
    */
<<<<<<< HEAD
    function buyInsurance (bytes32 flightKey) 
        external payable
        requireInsuranceAmount(msg.value)
=======
    function registerFlight () external pure
>>>>>>> upstream/master
    {
        require(flightData.flightExists(flightKey), "Flight key not found");
        if (passengers[msg.sender].addr == address(0)) {
            passengers[msg.sender] = Passenger({
                addr: msg.sender,
                isRegistered: true,
                bought: msg.value,
                payout: 0,
                flightKey: flightKey
            });
        }
        // insurances[flightKey].push(Insurance({buyerAddress: insuree, paidAmount: amount, payoutReceived: false}));
    }

    /********************************************************************************************/
    /* FLIGHTS
    /********************************************************************************************/

    /**
    * @dev Register a future flight for insuring.
    *
    */
    function registerFlight (string flightName, uint256 departureTime) external requireAirlineFunded(msg.sender) returns (bytes32)
    {   
        bytes32 flightKey;
        flightKey = flightData.registerFlight(msg.sender, flightName, departureTime);
        emit FlightRegistered(flightKey, msg.sender, flightName, departureTime);

        return flightKey;
    }


   /**
    * @dev Called after oracle has updated flight status
    * Trigger after
    * If on time, then close insurance claims
    * Otherwise, pay out insured (CODE 20)
    */
<<<<<<< HEAD
    function processFlightStatus ( address airline, string flightName, uint256 departureTime, uint8 newStatusCode) 
        external
        // internal
    {
        bytes32 flightKey = getFlightKey(airline, flightName, departureTime);
 
        flightData.updateFlight(airline, flightName, departureTime, newStatusCode);
        if (newStatusCode == STATUS_CODE_LATE_AIRLINE) {
            passengerData.creditInsurees(flightKey);
        }
=======
    function processFlightStatus ( address airline, string memory flight, uint256 timestamp, uint8 statusCode) internal pure 
    {

>>>>>>> upstream/master
    }


    // Generate a request for oracles to fetch flight information
    // Trigger from UI
    function fetchFlightStatus
                        (
                            address airline,
                            string flight,
                            uint256 timestamp
                        )
                        external
    {
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        oracleResponses[key] = ResponseInfo({
                                                requester: msg.sender,
                                                isOpen: true
                                            });

        emit OracleRequest(index, airline, flight, timestamp);
    }


// region ORACLE MANAGEMENT

    // Incremented to add pseudo-randomness at various points
    uint8 private nonce = 0;

    // Fee to be paid when registering oracle
    uint256 public constant REGISTRATION_FEE = 1 ether;

    // Number of oracles that must respond for valid status
    uint256 private constant MIN_RESPONSES = 3;


    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;
    }

    // Track all registered oracles
    mapping(address => Oracle) private oracles;

    // Model for responses from oracles
    struct ResponseInfo {
        address requester;                              // Account that requested status
        bool isOpen;                                    // If open, oracle responses are accepted
        mapping(uint8 => address[]) responses;          // Mapping key is the status code reported
                                                        // This lets us group responses and identify
                                                        // the response that majority of the oracles
    }

    // Track all oracle responses
    // Key = hash(index, flight, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event FlightStatusInfo(address airline, string flight, uint256 timestamp, uint8 status);

    event OracleReport(address airline, string flight, uint256 timestamp, uint8 status);

    // Event fired when flight status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(uint8 index, address airline, string flight, uint256 timestamp);


    // Register an oracle with the contract
    function registerOracle
                            (
                            )
                            external
                            payable
    {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({
                                        isRegistered: true,
                                        indexes: indexes
                                    });
    }

    function getMyIndexes
                            (
                            )
                            view
                            external
                            returns(uint8[3])
    {
        require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

        return oracles[msg.sender].indexes;
    }




    // Called by oracle when a response is available to an outstanding request
    // For the response to be accepted, there must be a pending request that is open
    // and matches one of the three Indexes randomly assigned to the oracle at the
    // time of registration (i.e. uninvited oracles are not welcome)
    function submitOracleResponse
                        (
                            uint8 index,
                            address airline,
                            string flight,
                            uint256 timestamp,
                            uint8 statusCode
                        )
                        external
    {
        require((oracles[msg.sender].indexes[0] == index) || (oracles[msg.sender].indexes[1] == index) || (oracles[msg.sender].indexes[2] == index), "Index does not match oracle request");


        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        require(oracleResponses[key].isOpen, "Flight or timestamp do not match oracle request");

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

            emit FlightStatusInfo(airline, flight, timestamp, statusCode);

    // function processFlightStatus ( address airline, string flightName, uint256 departureTime, uint8 newStatusCode) 
            // Handle flight status as appropriate
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }


    function getFlightKey
                        (
                            address airline,
                            string flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32)
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    // Returns array of three non-duplicating integers from 0-9
    function generateIndexes
                            (
                                address account
                            )
                            internal
                            returns(uint8[3])
    {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);

        indexes[1] = indexes[0];
        while(indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex
                            (
                                address account
                            )
                            internal
                            returns (uint8)
    {
        uint8 maxValue = 10;

        // Pseudo random number...the incrementing nonce adds variation
        uint8 random = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - nonce++), account))) % maxValue);

        if (nonce > 250) {
            nonce = 0;  // Can only fetch blockhashes for last 256 blocks so we adapt
        }

        return random;
    }

// endregion

}


contract AirlineData {
    // function registerAirline(string _airlineName, address _airlineAddress) external;
    function registerAirlineData(address _sponsor, string _airlineName, address _airlineAddress) external;
    function getAirline(address _airlineAddress) external view returns (string, address, uint, uint256);
    function vote(address _voter, address _address) external returns(uint);
    function fundAirline (address funder) external payable;
<<<<<<< HEAD
    function isAirlineFunded(address _airlineAddress) external view returns (bool);
=======
>>>>>>> upstream/master
}

contract FlightData {
    function registerFlight(address airline, string flightName, uint256 departureTime) external returns (bytes32);
    function updateFlight(address airline, string flightName, uint256 departureTime, uint8 newStatusCode) external;
    function flightExists(bytes32 _fkey) external view returns(bool exists);
}

contract PassengerData {
    function creditInsurees (bytes32 flightKey) external pure;
}