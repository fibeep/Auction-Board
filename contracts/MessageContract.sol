// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MessageContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PaperTrails", "PT") {

    }
    function sendMessage(address to, string memory metadata ) public returns (uint256) {
        
        _tokenIds.increment();
        
        uint256 newMessageId = _tokenIds.current();
        
        _mint(to, newMessageId);
        
        _setTokenURI(newMessageId, metadata);
        
        return newMessageId;
    }
}