// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract Decertify {
  address payable owner;

  struct Organization {
    address organizationAddress;
    string organizationName;
    string organizationEmail;
    uint256 requestCount;
  }

  struct Student {
    address studentAddress;
    string studentName;
    string studentId;
    string studentEmail;
    string studentMobile;
    uint256 requestCount;
  }

  struct Request {
    string requestId;
    address studentAddress;
    address organizationAddress;
    string uuid;
    string title;
    string description;
    string requestType;
    uint256 initTime;
    uint256 closeTime;
    uint256 status;
    string department;
    string comment;
  }

  Request[] requests;
  Organization[] organizations;

  uint256 organizationsCount;

  mapping(address => Student) studentsMapping;
  mapping(address => Organization) organizationMapping;
  mapping(string => Request) requestsMapping;
  mapping(string => string) documentsMapping;

  constructor() {
    owner = payable(msg.sender);
    organizationsCount = 0;
  }

  function registerStudent(
    string memory studentName1,
    string memory studentId1,
    string memory studentEmail1,
    string memory studentMobile1
  ) public {
    Student memory studentInstance = Student({
      studentAddress: msg.sender,
      studentName: studentName1,
      studentId: studentId1,
      studentEmail: studentEmail1,
      studentMobile: studentMobile1,
      requestCount: 0
    });
    studentsMapping[msg.sender] = studentInstance;
  }

  function checkIfStudentRegistered() public view returns (bool) {
    bytes memory tempEmptyStringTest = bytes(
      studentsMapping[msg.sender].studentName
    );
    return tempEmptyStringTest.length == 0;
  }

  function getStudentDetails() public view returns (Student memory) {
    Student memory student = studentsMapping[msg.sender];
    return student;
  }

  function getStudentRequests() public view returns (Request[] memory) {
    Request[] memory reqObjList = new Request[](
      studentsMapping[msg.sender].requestCount
    );
    uint256 count = 0;
    for (uint256 i = 0; i < requests.length; i++) {
      if (requests[i].studentAddress == msg.sender) {
        reqObjList[count] = requestsMapping[requests[i].requestId];
        count++;
      }
    }
    return reqObjList;
  }

  function registerOrg(string memory orgName, string memory orgMail) public {
    Organization memory orgInstance = Organization({
      organizationAddress: msg.sender,
      organizationName: orgName,
      organizationEmail: orgMail,
      requestCount: 0
    });

    organizations.push(orgInstance);
    organizationMapping[msg.sender] = orgInstance;

    organizationsCount += 1;
  }

  function regRequest(
    address org_addr,
    string memory req_uuid,
    string memory title,
    string memory desc,
    string memory reqType,
    uint256 initTime,
    string memory dept
  ) public {
    Request memory requestInstance = Request({
      requestId: req_uuid,
      studentAddress: msg.sender,
      organizationAddress: org_addr,
      uuid: "",
      title: title,
      description: desc,
      requestType: reqType,
      initTime: initTime,
      closeTime: 0,
      status: 1,
      department: dept,
      comment: ""
    });
    studentsMapping[msg.sender].requestCount += 1;
    requests.push(requestInstance);
    organizationMapping[org_addr].requestCount += 1;
    requestsMapping[req_uuid] = requestInstance;
  }

  function getRequests() public view returns (Request[] memory) {
    uint256 count = organizationMapping[msg.sender].requestCount;
    Request[] memory reqObjList = new Request[](count);
    uint256 cnt = 0;
    for (uint256 i = 0; i < requests.length; i++) {
      if (
        requests[i].organizationAddress == msg.sender && requests[i].status == 1
      ) {
        Request memory reqObj = Request({
          requestId: requests[i].requestId,
          studentAddress: requests[i].studentAddress,
          organizationAddress: requests[i].organizationAddress,
          uuid: requests[i].uuid,
          title: requests[i].title,
          description: requests[i].description,
          requestType: requests[i].requestType,
          initTime: requests[i].initTime,
          closeTime: requests[i].closeTime,
          status: requests[i].status,
          department: requests[i].department,
          comment: requests[i].comment
        });
        reqObjList[cnt] = reqObj;
        cnt += 1;
      }
    }
    return reqObjList;
  }

  function getOrganizations() public view returns (Organization[] memory) {
    Organization[] memory reqObjList = new Organization[](organizationsCount);
    for (uint256 i = 0; i < organizations.length; i++) {
      reqObjList[i] = organizations[i];
    }
    return reqObjList;
  }

  //reqId --> set only if updatedStatus = 2
  function updateStatus(
    string memory reqId,
    string memory cid,
    uint256 updatedStatus,
    string memory uuid,
    uint256 timeNow,
    string memory comment
  ) public {
    Request memory reqObj = requestsMapping[reqId];
    reqObj.status = updatedStatus;
    reqObj.uuid = uuid;
    reqObj.closeTime = timeNow;
    if (updatedStatus == 2) {
      documentsMapping[uuid] = cid;
    }
    reqObj.comment = comment;
  }
}
