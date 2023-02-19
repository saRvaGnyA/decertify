import React, { useCallback, useRef, useEffect, useState } from "react";
import download from "downloadjs";
import { PDFDocument } from "pdf-lib";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

export default function home() {
  let QRCode = require("qrcode");
  const [urlImage, seturlImage] = useState("");
  const [mergedPdfUrl, setMergedPdfUrl] = useState();
  const [cidValue, setcidValue] = useState("");
  const [fileQR, setfileQR] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const downloadName = "qrcodes";
  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }
  function getFiles() {
    const fileInput = document.querySelector('input[type="file"]');
    return fileInput.files[0];
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }
  async function storeFiles() {
    let files = getFiles();
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    setcidValue(cid);
    return cid;
  }

  const mergeFiles = async () => {
    let QRCode = require("qrcode");
    let canvas = document.getElementById("canvas");

    QRCode.toCanvas(canvas, "sample text", function (error) {
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
    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "example.pdf", "application/pdf");
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={mergeFiles}>Submit</button>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
}
