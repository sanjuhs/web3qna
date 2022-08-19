//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Token is ERC20Capped {
    uint256 public currentSupply;

    constructor(uint256 cap)
        ERC20Capped(cap)
        ERC20("Universal Learning Token", "ULT")
    {}

    function mint(address account, uint256 amount) internal {
        _mint(account, amount);
        currentSupply += amount;
    }

    function getCurrentCap() public view returns (uint256) {
        uint256 currentCap = cap();
        return currentCap;
    }
}
