import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";
import download from "downloadjs";
import { PDFDocument } from "pdf-lib";
import Web3 from "web3";
import { v4 as uuidv4 } from "uuid";
import { Contract, providers } from "ethers";
import Web3Modal from "web3modal";

export default function request() {
  // studentAddress
  // organizationAddress
  // description
  // comment
  const [commentMsg, setcommentMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  let pdfBytes;
  const router = useRouter();
  const query = router.query;
  const [cid, setCid] = useState(query.cid);
  const [uuid, setUuid] = useState(query.uuid || uuidv4());
  const web3ModalRef = useRef();
  const contract_addr = "0x1CCadcA3488E487b2a1df53Ac800Ca237150F4a7";
  const abi = require("./abi.json");

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
      window.alert("Change the network to Alfajores");
      throw new Error("Change network to Alfajores");
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
    const timeNow = Math.floor(today.getTime() / 1000);
    console.log(query.requestId);
    const newReqList = await contractInstance.updateStatus(
      query.requestId,
      cid,
      2,
      uuid,
      timeNow,
      commentMsg
    );
    console.log(newReqList);
    router.push("/dashboard");
  };

  const rejectStatusButton = async () => {
    const signer = await getProviderOrSigner(true);
    const contractInstance = new Contract(contract_addr, abi, signer);
    const today = new Date();
    const timeNow = Math.floor(today.getTime() / 1000);
    const newReqList = await contractInstance.updateStatus(
      query.requestId,
      "",
      3,
      "",
      timeNow,
      commentMsg
    );
    router.push("/dashboard");
  };

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxMDE1ODY3ODBCZGFmMWVBY0IwNmM1MWI4YkNkRTYwMjJlQzI0RjciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY2ODU5MDY0ODYsIm5hbWUiOiJkZWNlcnRpZnkifQ.q22IdiwHVCcE-pdSyjxz_wigkz2GX-fITlCSkIwhkDY";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const mergeFiles = async () => {
    let QRCode = require("qrcode");
    let canvas = document.getElementById("canvas");

    QRCode.toCanvas(canvas, uuid, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });

    let imgData = canvas.toDataURL("image/jpeg", 1.0);

    console.log(selectedFile);
    // const buffer = await selectedFile.arrayBuffer();
    let existingPdfBytes = await selectedFile.arrayBuffer();

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width } = firstPage.getSize();

    const jpgImage = await pdfDoc.embedJpg(imgData);

    const jpgDims = jpgImage.scale(0.5);

    firstPage.drawImage(jpgImage, {
      x: width - jpgDims.width,
      width: jpgDims.width,
      height: jpgDims.height,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    pdfBytes = await pdfDoc.save();
    download(pdfBytes, "verified.pdf", "application/pdf");
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const file = [new File([blob], "verified_doc.pdf")];
    const client = makeStorageClient();
    const cidRecd = await client.put(file);
    console.log("stored files with cid:", cidRecd);
    setCid(cidRecd);
  };

  const viewPdf = () => {
    window.open(`https://ipfs.io/ipfs/${cid}/verified_doc.pdf`, "_blank");
  };

  return (
    <div class="flex">
      <div>
        <p class="text-left tracking-tight hover:tracking-wide text-9xl">
          {query.name}
        </p>
        <div class="columns-2 max-w-4xl p-3 m-3 text-2xl">
          <p class="p-2 m-2">
            {" "}
            <b>Request:</b> {query.requestId}
          </p>
          <p class="p-2 m-2">
            {" "}
            <b>Title:</b> {query.title}
          </p>
          <p class="p-2 m-2">
            {" "}
            <b>Request Type:</b> {query.requestType}
          </p>
          <p class="p-2 m-2">
            {" "}
            <b>Status:</b> {query.status.toString()}
          </p>
          <p class="p-2 m-2">
            {" "}
            <b>Department:</b> {query.department}
          </p>
          <p class="p-2 m-2">
            {" "}
            <b>Comment:</b> {query.uuid}
          </p>
        </div>
        <p class="p-5 m-5 text-2xl">
          {" "}
          <b>Student Address:</b> {query.studentAddress}
        </p>
        <p class="p-5 m-5 text-2xl">
          {" "}
          <b>Description:</b> {query.description}
        </p>
      </div>

      <div>
        <div class="py-5">
          <input type="file" name="file" onChange={changeHandler} />
          <button
            onClick={mergeFiles}
            class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Upload to IPFS
          </button>
        </div>
        <div class="py-5">
          <input
            value={commentMsg}
            onChange={(e) => {
              setcommentMsg(e.target.value);
              console.log(commentMsg);
            }}
          ></input>
        </div>
        <div class="py-5">
          <button
            onClick={acceptStatusButton}
            class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Accept
          </button>
        </div>
        <div class="py-5">
          <button
            onClick={rejectStatusButton}
            class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Reject
          </button>
        </div>
        <div>
          <button
            onClick={viewPdf}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            View PDF
          </button>
        </div>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}
