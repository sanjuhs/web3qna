// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ULTNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    mapping(uint256 => string) private _textContents;
    mapping(address => uint256[]) public addressToTextSnippets;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ULTNFT", "ULT") {}

    function safeMint(address to, string memory text) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _textContents[tokenId] = text;
        _safeMint(to, tokenId);
        addressToTextSnippets[to].push(tokenId);
    }
}
