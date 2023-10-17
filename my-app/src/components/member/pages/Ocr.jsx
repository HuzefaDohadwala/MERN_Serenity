import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const Ocr = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');
  const [extractedData, setExtractedData] = useState({});

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages(uploadedImages);
    setCurrentIndex(0);
    setRecognizedText('');
    setExtractedData({});
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

    await worker.terminate();
  };

  const extractDataLabels = (text) => {
    const labels = [
      "Name and Credentials",
      "License Information",
      "Professional Certification",
      "Professional Licensing Details",
      "Credentials and Licensing",
      "License Verification",
      "Professional Qualifications",
      "Medical License",
      "Doctor's License",
      "License and Contact Information",
      "Authorized Practitioner Information",
      "Medical Practitioner Credentials",
      "Physician License Data",
      "Licensed Medical Professional",
    ];

    const data = {};

    labels.forEach((label) => {
      const labelRegex = new RegExp(`${label}:(.*?)($|(?=${labels.join('|')}))`, 'is');
      const match = text.match(labelRegex);
      if (match) {
        data[label] = match[1].trim();
      }
    });

    return data;
  };

  const nextImage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
      processImage(nextIndex);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Document Verification</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" multiple />
        <button
          onClick={() => processImage(currentIndex)}
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md mb-4"
        >
          Process Image
        </button>
        <div className="results">
          <h2 className="text-lg font-semibold">Recognized Text</h2>
          <p className="text-gray-700">{recognizedText}</p>
        </div>
        <div className="data">
          <h2 className="text-lg font-semibold mt-4">Extracted Data</h2>
          {Object.keys(extractedData).map((label) => (
            <div key={label}>
              <h3 className="text-gray-700 font-semibold">{label}</h3>
              <p className="text-gray-700">{extractedData[label]}</p>
            </div>
          ))}
        </div>
        <button
          onClick={nextImage}
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md mt-4"
        >
          Next Image
        </button>
      </div>
    </div>
  );
};

export default Ocr;
