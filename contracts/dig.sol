// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dig is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply; 
    mapping(uint256 => bool) public _isTokenMinted;

    string public constant CC0_LICENSE = "CC0 1.0 Universal (CC0 1.0) Public Domain Dedication";

    constructor(address initialOwner) ERC721("Dig", "DIG") Ownable(initialOwner) {
        transferOwnership(initialOwner);
        maxSupply = 1;
    }

    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        maxSupply = newMaxSupply;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        require(_tokenIds.current() < maxSupply, "Max supply reached");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _isTokenMinted[newItemId] = true;
    }

    function getRemainingNFTs() public view returns (uint256) {
        return maxSupply - _tokenIds.current();
    }

    function totalSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getCurrentTokenId() public view onlyOwner returns (uint256) {
        return _tokenIds.current();
    }

    function transferGrail(address from, address to, uint256 tokenId) public onlyOwner {
        require(_isTokenMinted[tokenId], "Token does not exist");
        _transfer(from, to, tokenId);
    }

    modifier onlyOwnerTransfer() {
        require(msg.sender == owner(), "Transfers are disabled");
        _;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) onlyOwnerTransfer {
        super.transferFrom(from, to, tokenId);
    }

    function approve(address /*to*/, uint256 /*tokenId*/) public override(ERC721, IERC721) {
        revert("Approvals are disabled");
    }

    function setApprovalForAll(address /*operator*/, bool /*approved*/) public override(ERC721, IERC721) {
        revert("Set approval for all is disabled");
    }
}
