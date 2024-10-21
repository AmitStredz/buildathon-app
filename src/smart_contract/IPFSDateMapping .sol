// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSDateMapping {
   
    mapping(string => string[]) private dateToCIDs;

    event CIDAdded(string date, string cid);

    function addCID(string memory date, string memory cid) public {
      
        dateToCIDs[date].push(cid);

        emit CIDAdded(date, cid);
    }

    function getCIDs(string memory date) public view returns (string[] memory) {
        return dateToCIDs[date];
    }
}