import React, { useState } from "react";
import { createWorker } from "tesseract.js";

const Ocr = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");
  const [extractedData, setExtractedData] = useState({});
  const [verificationResult, setVerificationResult] = useState(null);

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages(uploadedImages);
    setCurrentIndex(0);
    setRecognizedText("");
    setExtractedData({});
    setVerificationResult(null);
  };

  const processImage = async (index) => {
    if (images.length === 0 || index < 0 || index >= images.length) {
      return;
    }

    const image = images[index];
    const worker = await createWorker();
    const { data } = await worker.recognize(image, {
      rotateAuto: true,
    });

    setRecognizedText(data.text);

    const extractedData = extractDataLabels(data.text);
    setExtractedData(extractedData);

    const result = verifyData(extractedData);
    setVerificationResult(result);

    if (result) {
      console.log("Verification successful!");
    } else {
      console.log("Verification failed.");
    }

    await worker.terminate();
  };

  const extractDataLabels = (text) => {
    // Define labels and corresponding regular expressions
    const labels = [
      "DATE OF INITIAL ISSUANCE",
      "LICENSE NUMBER",
      "BOARD ISSUED NUMBER",
    ];

    const data = {};

    labels.forEach((label) => {
      // Create a regex pattern that matches the label and captures the relevant content
      const labelRegex = new RegExp(`${label}:[\\s]*([\\w-]+)`, "is");
      const match = text.match(labelRegex);
      if (match) {
        data[label] = match[1].trim();
      }
    });

    return data;
  };

  const verifyData = (data) => {
    const boardIssuedNumberCondition =
      data["BOARD ISSUED NUMBER"] === "BN-4937";
    const licenseNumberCondition =
      data["LICENSE NUMBER"] && data["LICENSE NUMBER"].length === 8; // You mentioned "MD-75639" as the example.
    // const dateOfInitialIssuanceCondition = new Date(data["DATE OF INITIAL ISSUANCE"]).getFullYear() === 2014; // You mentioned "21-04-2014" as the example.

    // All three conditions must be true for the overall verification to be true
    return boardIssuedNumberCondition && licenseNumberCondition;
  };

  console.log(extractedData);

  return (
    <div className="min-h-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-semibold mb-4">
          Upload an image of your license to practice{" "}
        </h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
          multiple
        />
        <button
          onClick={() => processImage(currentIndex)}
          className="bg-blue-500bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white hover-bg-blue-600 py-2 px-4 rounded-md mb-4"
        >
          Verify Document
        </button>
        <div className="verification">
          {verificationResult === true ? (
            <span style={{ color: "green" }}>✔</span>
          ) : verificationResult === false ? (
            <span style={{ color: "red" }}>✘</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Ocr;
