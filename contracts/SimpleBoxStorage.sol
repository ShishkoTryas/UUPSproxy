// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./utils/Initializable.sol";
import "./access/OwnableUpgradeable.sol";
import "./Proxyable.sol";

contract SimpleBox is Initializable, OwnableUpgradeable, Proxyable {

    uint256 private a;

    function init() public initializer {
        __Ownable_init(msg.sender);
    }

    function setA(uint256 newA) external {
        a = newA;
    }

    function getA() view external returns(uint256) {
        return a;
    }

    function updateCode(address newCode) public onlyOwner {
        updateCodeAddress(newCode);
    }
}

contract SimpleBox2 is Initializable, OwnableUpgradeable, Proxyable {

    uint256 private a;
    uint256 private b;
    uint256 private c;

    function init() public initializer {
        __Ownable_init(msg.sender);
    }

    function setA(uint256 newA) external {
        a = newA;
    }

    function getA() view external returns(uint256) {
        return a;
    }

    function setB(uint256 newB) external {
        b = newB;
    }

    function getB() view external returns(uint256) {
        return b;
    }

    function setC(uint256 newC) external {
        c = newC;
    }

    function getC() view external returns(uint256) {
        return c;
    }

    function updateCode(address newCode) public onlyOwner {
        updateCodeAddress(newCode);
    }
}