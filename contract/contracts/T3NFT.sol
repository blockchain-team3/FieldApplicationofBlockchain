// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract T3NFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("T3NFT", "T3T") {}

    mapping(uint256 => address) public T3NFT_to_owner; // owner is set to backend account
    mapping(uint256 => string) public participants; // 

    function mintT3NFT(string memory tokenURI, string memory ppl) external onlyOwner returns (uint256) {
        // ppl -> participants list in string
        // token uri -> nft address
        _tokenIds.increment(); // 1-based
        uint newTokenId = _tokenIds.current();
        T3NFT_to_owner[newTokenId] = msg.sender;
        participants[newTokenId] = ppl;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function currentNum() public view returns (uint) {
        return _tokenIds.current();
    }

}