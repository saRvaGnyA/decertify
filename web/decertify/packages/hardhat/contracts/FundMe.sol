//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundMe {
    uint256 public minimumUsd = 50;
    function setPrice() public {
        minimumUsd -= 1;
    }

    function getPrice() public view returns(uint256){
        // ABI
        // Address : 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        return minimumUsd;
    }
    function getConversationRate() public {}
}

