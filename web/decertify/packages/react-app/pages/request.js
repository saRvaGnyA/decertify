import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { userInfo } from 'os';

import Web3 from "web3"
import { Contract, providers, } from "ethers";
import Web3Modal from "web3modal";

export default function request() {
  // studentAddress
  // organizationAddress
  // description
  // comment
  const [commentMsg, setcommentMsg] = useState("")
  const router = useRouter()
  const query = router.query
  const web3ModalRef = useRef();
  const contract_addr = "0xfB83a23f36a852e7a90DD304DeB7D4f6542D56F7"
  const abi = require('./abi.json')
  const getProviderOrSigner = async (needSigner) => {
    web3ModalRef.current = new Web3Modal({
      network: "Celo (Alfajores Testnet)",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 44787) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };
  const acceptStatusButton = async () => {
    const signer = await getProviderOrSigner(true);
    const contractInstance = new Contract(contract_addr, abi, signer);
    const today = new Date();
    const timeNow = Math.floor((today.getTime()) / 1000);
    // console.log(query.uuid)
    console.log(query.requestId)
    // console.log(query.uuid)
    const newReqList = await contractInstance.updateStatus(query.requestId, "CID", 2, "uuid", timeNow, commentMsg);

    console.log(newReqList)
  }
  const rejectStatusButton = async () => {
    const signer = await getProviderOrSigner(true);
    const contractInstance = new Contract(contract_addr, abi, signer);
    const today = new Date();
    const timeNow = Math.floor((today.getTime()) / 1000);
    const newReqList = await contractInstance.updateStatus(query.requestId, "CID", 3, query.uuid, timeNow, commentMsg);

  }

  return (
    <div class="flex">
      <div>
        <p class="text-left tracking-tight hover:tracking-wide text-9xl">{query.name}</p>
        <div class="columns-2 max-w-4xl p-3 m-3 text-2xl">
          <p class="p-2 m-2"> <b>Request:</b> {query.requestId}</p>
          <p class="p-2 m-2"> <b>Title:</b> {query.title}</p>
          <p class="p-2 m-2"> <b>Request Type:</b> {query.requestType}</p>
          <p class="p-2 m-2"> <b>Status:</b> {query.status}</p>
          <p class="p-2 m-2"> <b>Department:</b> {query.department}</p>
          <p class="p-2 m-2"> <b>Comment:</b> {query.uuid}</p>
        </div>
        <p class="p-5 m-5 text-2xl"> <b>Student Address:</b> query.Description</p>
        <p class="p-5 m-5 text-2xl"> <b>Organization Address:</b> query.Description</p>
        <p class="p-5 m-5 text-2xl"> <b>Description:</b> query.Description</p>
      </div>

      <div>
        <div class="py-5">
          <button class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Upload to IPFS
          </button>
        </div>
        <div class="py-5">
          <input onChange={(e) => { setcommentMsg(e.target.value);
          console.log(commentMsg) }}></input>
        </div>
        <div class="py-5">
          <button onClick={acceptStatusButton} class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Accept
          </button>
        </div>
        <div class="py-5">
          <button onClick={rejectStatusButton} class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Reject
          </button>
        </div>
        <div>
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            View PDF
          </button>
        </div>
      </div>

    </div>
  );
}