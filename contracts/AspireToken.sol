pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol';

/**
 * @title AspireToken
 * 
 * @dev This is a Aspire token contract with all functionality.
 */
contract AspireToken is MintableToken, PausableToken {
    
    // Token name
    string public constant name = "AspireToken";
    // Token symbol
    string public constant symbol = "ASP";
    // Amount of decimals
    uint8 public constant decimals = 18;
  
}