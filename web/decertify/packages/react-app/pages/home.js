import React, { useCallback, useEffect, useState } from "react";
import { ContractKitProvider, useContractKit } from "@celo-tools/use-contractkit";
import { newKitFromWeb3 } from "@celo/contractkit/lib/mini-kit";
// import {Greeter} from '../../hardhat/contracts/FundMe.sol'
import Web3 from "web3"
export default function home() {
    const fs = require('fs');
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    const kit = newKitFromWeb3(web3)
    // const { kit, address, network, performActions } = useContractKit();
    const  abi =require('./abi.json')
    const contract_addr = "0x4D051507a2ef3A82BBd852e2c79a1E06229A4931"
    const getPrice = async () => {
        const contractInstance = new kit.connection.web3.eth.Contract(abi, contract_addr)
        const price = await contractInstance.methods.getPrice().call();      
        console.log( price)
    }
    return (
        

        <div>
            Hello
            <button onClick={getPrice}>Click</button>
        </div>

    )
}
