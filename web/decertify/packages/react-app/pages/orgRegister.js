import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { Contract, providers } from "ethers";
import Web3Modal from "web3modal";
// import React from "react";

export default function orgReg() {
  const web3ModalRef = useRef();
  const router = useRouter()
  const contract_addr = "0x1CCadcA3488E487b2a1df53Ac800Ca237150F4a7"
  const abi = require('./abi.json')
  const [orgEmail, setorgEmail] = useState("")
  const [orgName, setorgName] = useState("")
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
  const getOrgReg = async () => {
    const signer = await getProviderOrSigner(true);
    const contractInstance = new Contract(contract_addr, abi, signer);
    const newReqList = await contractInstance.registerOrg(orgName, orgEmail);
    router.push({ pathname: '/dashboard' })
    // console.log(newReqList);
    // setrequestsList(newReqList);
  }
  return (
    <div>
      <div class="border-solid border-5 border-blue-700 ">
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="Organization Name"
              />
            </div>
            <TextInput
              id="text"
              type="email"
              placeholder="name@flowbite.com"
              required={true}
              onChange={
                (e) => {
                  setorgEmail(e.target.value)
                }
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Organization Email"
              />
            </div>
            <TextInput
              id="email"
              type="email"
              required={true}
              onChange={
                (e) => {
                  setorgName(e.target.value)
                }
              }
            />
          </div>
          <Button type="submit" onClick={getOrgReg}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}