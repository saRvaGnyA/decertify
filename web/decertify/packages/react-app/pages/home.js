import React, { useCallback, useRef, useEffect, useState } from "react";
import { ContractKitProvider, useContractKit } from "@celo-tools/use-contractkit";
import { MiniContractKit, newKitFromWeb3 } from "@celo/contractkit/lib/mini-kit";
// import {Greeter} from '../../hardhat/contracts/FundMe.sol'
import Web3 from "web3"
import { Contract, providers, } from "ethers";
import { useCelo } from "@celo/react-celo";
import Web3Modal from "web3modal";
import QRCode from "react-qr-code";
import {PDFtoIMG} from 'react-pdf-to-image';

export default function home() {


    return (
        <div>
            <QRCode value="hey" />
            <PDFtoIMG file={file}>
                {({ pages }) => {
                    if (!pages.length) return 'Loading...';
                    return pages.map((page, index) =>
                        <img key={index} src={page} />
                    );
                }}
            </PDFtoIMG>

            <button className="m-2">Get Request</button>

            {/* <button onClick={getPrice}>Click</button> */}
        </div>

    )
}
