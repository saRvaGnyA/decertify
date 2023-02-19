export const contractAddress = "0x1CCadcA3488E487b2a1df53Ac800Ca237150F4a7";

export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "orgName",
        type: "string",
      },
      {
        internalType: "string",
        name: "orgMail",
        type: "string",
      },
    ],
    name: "registerOrg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "studentName1",
        type: "string",
      },
      {
        internalType: "string",
        name: "studentId1",
        type: "string",
      },
      {
        internalType: "string",
        name: "studentEmail1",
        type: "string",
      },
      {
        internalType: "string",
        name: "studentMobile1",
        type: "string",
      },
    ],
    name: "registerStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "req_uuid",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "desc",
        type: "string",
      },
      {
        internalType: "string",
        name: "reqType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "dept",
        type: "string",
      },
    ],
    name: "regRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reqId",
        type: "string",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "int256",
        name: "updatedStatus",
        type: "int256",
      },
      {
        internalType: "string",
        name: "uuid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeNow",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "updateStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkIfStudentRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uuid",
        type: "string",
      },
    ],
    name: "getHashedVal",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrganizations",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "organizationAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "organizationName",
            type: "string",
          },
          {
            internalType: "string",
            name: "organizationEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "requestCount",
            type: "uint256",
          },
        ],
        internalType: "struct Decertify.Organization[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrgDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "organizationAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "organizationName",
            type: "string",
          },
          {
            internalType: "string",
            name: "organizationEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "requestCount",
            type: "uint256",
          },
        ],
        internalType: "struct Decertify.Organization",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequests",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "requestId",
            type: "string",
          },
          {
            internalType: "address",
            name: "studentAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "organizationAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "uuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "requestType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTime",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "status",
            type: "int256",
          },
          {
            internalType: "string",
            name: "department",
            type: "string",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct Decertify.Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStudentDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "studentAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "studentName",
            type: "string",
          },
          {
            internalType: "string",
            name: "studentId",
            type: "string",
          },
          {
            internalType: "string",
            name: "studentEmail",
            type: "string",
          },
          {
            internalType: "string",
            name: "studentMobile",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "requestCount",
            type: "uint256",
          },
        ],
        internalType: "struct Decertify.Student",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStudentRequests",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "requestId",
            type: "string",
          },
          {
            internalType: "address",
            name: "studentAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "organizationAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "uuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "requestType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "initTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTime",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "status",
            type: "int256",
          },
          {
            internalType: "string",
            name: "department",
            type: "string",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct Decertify.Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
