// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DigTokens is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    mapping(address => bool) public whitelistedTokens;

    event TokenWhitelisted(address indexed tokenAddress);
    event TokenRemovedFromWhitelist(address indexed tokenAddress);
    event TokensTransferred(address indexed tokenAddress, address indexed to, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {
        transferOwnership(initialOwner);
    }

    function addTokenToWhitelist(address tokenAddress) public onlyOwner {
        whitelistedTokens[tokenAddress] = true;
        emit TokenWhitelisted(tokenAddress);
    }

    function removeTokenFromWhitelist(address tokenAddress) public onlyOwner {
        whitelistedTokens[tokenAddress] = false;
        emit TokenRemovedFromWhitelist(tokenAddress);
    }

    receive() external payable {
        revert("Contract does not accept Ether directly");
    }

    function getERC20Balance(address tokenAddress) public view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }

    function transferTokens(address tokenAddress, address to, uint256 amount) public onlyOwner nonReentrant {
        require(whitelistedTokens[tokenAddress], "Token address not whitelisted");
        
        IERC20 token = IERC20(tokenAddress);

        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= amount, "Not enough tokens in contract");

        token.safeTransfer(to, amount);
        emit TokensTransferred(tokenAddress, to, amount);
    }
}
