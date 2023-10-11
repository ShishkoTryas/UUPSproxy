// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

abstract contract Proxyable {
    function updateCodeAddress(address _newImp) internal {
        uint256 slot = uint256(keccak256("eip1967.proxy.implementation")) - 1;

        assembly {
            sstore(slot, _newImp)
        }
    }
}