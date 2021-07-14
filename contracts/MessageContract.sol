// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MessageContract is ERC721URIStorage {
    // Keeps track of the number of tokens generated
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    // Specifies the name and symbols for the token
    constructor() ERC721("PaperTrails", "PT") {

    }

    // Function to send a message (and mint a Paper Trail token)
    function sendMessage(address to, string memory metadata ) public returns (uint256) {
        // Since a new token is being minted, we must increment the IDs
        _tokenIds.increment();
        
        // Assigns the new incremented ID to the Message's ID
        uint256 newMessageId = _tokenIds.current();
        
        // Mints the token (message) and sends it to the person who is supposed
        // to recieve it
        _mint(to, newMessageId);
        
        // Sets the URL to the token, which also adds the  metadata (name, title, images, etc.)
        _setTokenURI(newMessageId, metadata);
        
        return newMessageId;
    }
}
