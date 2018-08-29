pragma solidity ^0.4.24;

import './AspireToken.sol';

/**
 * @title Verification
 * 
 * @dev This is a Verification contract that will store data of candidates.
 */
contract Verification {
    
    // Aspire address to distribute tokens
    address public aspireRecruitment;
    // Aspire address to validate claims
    address public aspireValidation;
    // Aspire platform operator address
    address public aspirePlatform;
    // Aspire token contract address
    AspireToken aspireToken;
    
    struct Claim {
        address certifier;
        address validator;
        uint status;
        bytes32 hash;
        uint timestamp;
    }
    
    struct Data {
        // claims part
        Claim[] claims;
        mapping(bytes32 => bool) claim;
        mapping(bytes32 => uint) claimIndex;
        // certifiers part
        address[] certifiers;
        mapping(address => bool) certifier;
        // validators part
        address[] validators;
        mapping(address => bool) validator;
        // verifiers
        mapping(uint => bool) verified;
    }
    
    mapping(address => Data) internal user;
    // all candidates
    address[] public candidates;
    // is candidate exist
    mapping(address => bool) internal candidate;
    
    uint constant PENDING = 1;
    uint constant VALIDATED = 2;
    uint constant NOT_VALIDATED = 3;
    
    /**
     * @param _aspireToken Aspire token contract address
     */
    constructor(AspireToken _aspireToken, address _aspireValidation) public {
        require(_aspireToken != address(0)
                && _aspireValidation != address(0));
        
        aspireToken = _aspireToken;
        aspireValidation = _aspireValidation;
        aspireRecruitment = msg.sender;
        aspirePlatform = msg.sender;
    }
    
    /**
     * @dev Modifier to check wallet is Aspire Recruitment address.
     */
    modifier onlyAspireRecruitment() {
        require(msg.sender == aspireRecruitment);
        _;
    }
    
    /**
     * @dev Modifier to check wallet is Aspire Validation address.
     */
    modifier onlyAspireValidation() {
        require(msg.sender == aspireValidation);
        _;
    }
    
    /**
     * @dev Modifier to check wallet not to be null.
     */
    modifier notNull(address _wallet) {
        require(_wallet != address(0));
        _;
    }
    
    /**
     * @dev Modifier to 
     */
    modifier candidateExists(address _candidate) {
        require(candidate[_candidate] == true);
        _;
    }
    
    /**
     * @dev Modifier to
     */
    modifier isPending(address _candidate, bytes32 _hash) {
        require(user[_candidate].claims[user[_candidate].claimIndex[_hash]].status == PENDING);
        _;
    }
    
    /**
     * @dev Modifier to
     */
    modifier claimExists(address _candidate, bytes32 _hash) {
        require(user[_candidate].claim[_hash] == true);
        _;
    }
    
    /**
     * @dev Modifier to
     */
    modifier claimsNotExist(bytes32[] _hashes) {
        for (uint i = 0; i < _hashes.length; i++){
           require(user[msg.sender].claim[_hashes[i]] == false); 
        }
        _;
    }
    
    /**
     * @dev Modifier to
     */
    modifier isVerified(address _candidate, uint _verifier) {
        require(user[_candidate].verified[_verifier] == true);
        _;
    }
    
    /**
     * @dev Modifier to
     */
    modifier notVerified(address _candidate, uint _verifier) {
        require(user[_candidate].verified[_verifier] == false);
        _;
    }
    
    /**
     * @dev Add "pending" status to candidates claims.
     * @param _hashes Claims
     */
    function claim(
        bytes32[] _hashes
    )
        claimsNotExist(_hashes)
        public
        returns (bool)
    {

        if (candidate[msg.sender] == false){
            candidates.push(msg.sender);
            candidate[msg.sender] = true;
        }
        
        for (uint i = 0; i < _hashes.length; i++){
            
            uint id = user[msg.sender].claims.length++;
            bytes32 hash = _hashes[i];
            
            user[msg.sender].claims[id].hash = hash;
            user[msg.sender].claims[id].status = PENDING;
            
            user[msg.sender].claimIndex[hash] = id;
            user[msg.sender].claim[hash] = true;
        }
        
        return true;
    }
    
    /**
     * 
     * 
     * 
     */
    function verify(
        address _candidate,
        uint _verifier
    )
        onlyAspireRecruitment
        notNull(_candidate)
        candidateExists(_candidate)
        notVerified(_candidate, _verifier)
        public
        returns (bool)
    {

        MintableToken(aspireToken).mint(_candidate, 20*(10**18));
        MintableToken(aspireToken).mint(aspirePlatform, 10*(10**18));
        
        for (uint i = 0; i < user[_candidate].validators.length; i++){
            MintableToken(aspireToken).mint(user[_candidate].validators[i], 20*(10**18));
        }
        
        for (uint n = 0; n < user[_candidate].certifiers.length; n++){
            MintableToken(aspireToken).mint(user[_candidate].certifiers[n], 20*(10**18));
        }
        
        user[_candidate].verified[_verifier] = true;
        
        return true;
    }
    
    /**
     * 
     * 
     * 
     */
    function validate(
        address _candidate,
        address _certifier,
        bytes32 _hash,
        bool _status
    )
        onlyAspireValidation
        notNull(_candidate)
        notNull(_certifier)
        candidateExists(_candidate)
        claimExists(_candidate, _hash)
        isPending(_candidate, _hash)
        public
        returns (bool)
    {
        uint claimIndex = user[_candidate].claimIndex[_hash];

        if(_status == true){
            user[_candidate].claims[claimIndex].status = VALIDATED;
        } else {
            user[_candidate].claims[claimIndex].status = NOT_VALIDATED;
        }
        
        if (user[_candidate].validator[msg.sender] == false){
            user[_candidate].validators.push(msg.sender);
            user[_candidate].validator[msg.sender] = true;
        }
        
        if (user[_candidate].certifier[_certifier] == false){
            user[_candidate].certifiers.push(_certifier);
            user[_candidate].certifier[_certifier] = true;
        }
        
        user[_candidate].claims[claimIndex].validator = msg.sender;
        user[_candidate].claims[claimIndex].certifier = _certifier;
        user[_candidate].claims[claimIndex].timestamp = block.timestamp;

        return true;
    }
    
    /**
     * 
     * 
     */
    function getClaims(
        address _candidate    
    )
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (bytes32[])
    {
        uint count = 0;
        uint numberOfClaims = user[_candidate].claims.length;
        bytes32[] memory claims = new bytes32[](numberOfClaims);
        
        for (uint i = 0; i < numberOfClaims; i++){
            claims[count] = user[_candidate].claims[i].hash;
            count++;
        }
        
        return claims;
    }
    
    /**
     * 
     * 
     */
    function getPendingClaims(
        address _candidate    
    )
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (bytes32[])
    {
        uint count = 0;
        uint numberOfClaims = user[_candidate].claims.length;
        bytes32[] memory claims = new bytes32[](numberOfClaims);
        
        for (uint i = 0; i < numberOfClaims; i++){
            if(user[_candidate].claims[i].status == PENDING){
                claims[count] = user[_candidate].claims[i].hash;
                count++;
            }
        }
        
        bytes32[] memory pendingClaims = new bytes32[](count);
        for (uint n = 0; n < count; n++){
             pendingClaims[n] = claims[n];
        }
        
        return pendingClaims;
    }
    
    /**
     * 
     * 
     */
    function getAmountOfPendingClaims(
        address _candidate    
    )
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (uint)
    {
        uint count = 0;
        uint numberOfClaims = user[_candidate].claims.length;
        bytes32[] memory claims = new bytes32[](numberOfClaims);
        
        for (uint i = 0; i < numberOfClaims; i++){
            if(user[_candidate].claims[i].status == PENDING){
                claims[count] = user[_candidate].claims[i].hash;
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * 
     * 
     */
    function getValidatedClaims(
        address _candidate    
    )
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (bytes32[])
    {
        uint count = 0;
        uint numberOfClaims = user[_candidate].claims.length;
        bytes32[] memory claims = new bytes32[](numberOfClaims);
        
        for (uint i = 0; i < numberOfClaims; i++){
            if(user[_candidate].claims[i].status != PENDING){
                claims[count] = user[_candidate].claims[i].hash;
                count++;
            }
        }
        
        bytes32[] memory validatedClaims = new bytes32[](count);
        for (uint n = 0; n < count; n++){
             validatedClaims[n] = claims[n];
        }
        
        return validatedClaims;
    }
    
    /**
     * 
     * 
     */
    function getAmountOfValidatedClaims(
        address _candidate    
    )
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (uint)
    {
        uint count = 0;
        uint numberOfClaims = user[_candidate].claims.length;
        bytes32[] memory claims = new bytes32[](numberOfClaims);
        
        for (uint i = 0; i < numberOfClaims; i++){
            if(user[_candidate].claims[i].status != PENDING){
                claims[count] = user[_candidate].claims[i].hash;
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * 
     * 
     */
    function isVerifier(
        address _candidate,
        uint _verifier
    )
        onlyAspireRecruitment
        notNull(_candidate)
        candidateExists(_candidate)
        public
        view
        returns (bool)
    {
        return user[_candidate].verified[_verifier];
    }
    
    /**
     * 
     * 
     */
    function getClaimStatusForCandidate(
        bytes32 _hash
    )
        candidateExists(msg.sender)
        claimExists(msg.sender, _hash)
        public
        view
        returns (uint, address)
    {
        uint claimIndex = user[msg.sender].claimIndex[_hash];
        
        uint status = user[msg.sender].claims[claimIndex].status;
        address certifier = user[msg.sender].claims[claimIndex].certifier;
        
        return (status, certifier);
    }
    
    /**
     * 
     * 
     */
    function getClaimStatusForVerifier(
        address _candidate,
        bytes32 _hash,
        uint _verifier
    )
        onlyAspireRecruitment
        notNull(_candidate)
        candidateExists(_candidate)
        claimExists(_candidate, _hash)
        isVerified(_candidate, _verifier)
        public
        view
        returns (uint, address)
    {
        uint claimIndex = user[_candidate].claimIndex[_hash];
        
        uint status = user[_candidate].claims[claimIndex].status;
        address certifier = user[_candidate].claims[claimIndex].certifier;
        
        return (status, certifier);
    }
    
    /**
     * 
     * 
     */
    function getClaimDetailsForCandidate(
        bytes32 _hash
    )
        candidateExists(msg.sender)
        claimExists(msg.sender, _hash)
        public
        view
        returns (address, uint)
    {
        uint claimIndex = user[msg.sender].claimIndex[_hash];
        
        address validator = user[msg.sender].claims[claimIndex].validator;
        uint date = user[msg.sender].claims[claimIndex].timestamp;
        
        return (validator, date);
    }
    
    /**
     * 
     * 
     */
    function getClaimDetailsForVerifier(
        address _candidate,
        bytes32 _hash,
        uint _verifier
    )
        onlyAspireRecruitment
        notNull(_candidate)
        candidateExists(_candidate)
        claimExists(_candidate, _hash)
        isVerified(_candidate, _verifier)
        public
        view
        returns (address, uint)
    {
        uint claimIndex = user[_candidate].claimIndex[_hash];
        
        address validator = user[_candidate].claims[claimIndex].validator;
        uint date = user[_candidate].claims[claimIndex].timestamp;
        
        return (validator, date);
    }
    
    /**
     * 
     * 
     */
    function getAmountOfCandidates()
        public
        view
        returns (uint)
    {
        return candidates.length;
    }
    
}