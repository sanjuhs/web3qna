//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Token.sol";
import "./ULTNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Mint is Token, Ownable {
    ULTNFT public myNFT;
    mapping(string => uint64) public qIdToNumAnswers;
    uint256 reward = 10 * 1e18;

    constructor(address NFTContractAddress, uint256 cap) Token(cap) {
        myNFT = ULTNFT(NFTContractAddress);
    }

    function mintAndReward(
        address user,
        string memory id,
        string memory text
    ) public {
        myNFT.safeMint(user, text);

        //calculate the reward
        qIdToNumAnswers[id]++;

        //reward user
        mint(user, reward);
    }

    function changeReward(uint newReward) public onlyOwner {
        //update reward
        reward = newReward;
    }
}
