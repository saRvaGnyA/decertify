// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {


  function regRequest( address org_addr,string uuid, string title, string desc, string reqType , uint256 initTime,string dept) public {
    uint256 reqId =  requests.length() + 1 ;
    Request requestInstance = new Request({
      requestId:reqId
      organizationAddress: org_addr,
      studentAddress: msg.sender,
      uuid: uuid,
      title:title,
      description:desc,
      requestType:reqType,
      initTime:initTime,
      status:1
      department:dept,


    })
    requests.push(requestInstance);
  organizationMapping[org_addr].requestCount += 1 ;
    requestsMapping[reqId]  = requestInstance;
  }

 
}
