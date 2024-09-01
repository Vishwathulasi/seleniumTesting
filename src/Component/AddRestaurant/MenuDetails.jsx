import React, { useState } from "react";
import QRCode from "qrcode";
import menu from "../../assests/video/menu.mp4";
import { useNavigate } from "react-router-dom";
import "./MenuDetails.css";

const MenuDetails = () => {
  const [uploadMethod, setUploadMethod] = useState("manual");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(uploadedFiles);
  };

  const handleFileSelect = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    handleFileUpload(uploadedFiles);
  };

  const handleFileUpload = (uploadedFiles) => {
    const updatedFiles = uploadedFiles.map((file) => ({
      file,
      progress: 0,
      completed: false,
    }));
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

    updatedFiles.forEach((fileObj) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file.name === fileObj.file.name
              ? {
                  ...f,
                  progress: f.progress + 10,
                  completed: f.progress + 10 >= 100 ? true : false,
                }
              : f
          )
        );
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique identifier for the restaurant
    const uniqueId = Date.now().toString();

    try {
      const url = `https://www.britannica.com/place/Switzerland/${uniqueId}`;
      console.log("Generated URL: ", url); // Check the URL in the console
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCode(qrCodeDataUrl);

      // Navigate to QRCodePage with the QR code data
      navigate("/qrcode", { state: { qrCode: qrCodeDataUrl } });
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }

    // Here, you would typically also handle form submission logic (e.g., sending data to the server)
  };
  return (
    <div className="menu-details-page">
      <div className="menu-video-container">
        <video className="menu-centered-video" autoPlay loop muted>
          <source src={menu} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="content-heading">Menu and Operational Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Upload Restaurant Picture</label>
          <div
            className={`upload-container ${isDragging ? "dragover" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <p>Click to upload or drag and drop</p>
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileSelect}
              multiple
            />
          </div>
        </div>

        <div className="upload-list">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className={`upload-item ${
                fileObj.completed ? "upload-item-complete" : ""
              }`}
            >
              <span>{fileObj.file.name}</span>
              <div className="upload-item-progress">
                <div
                  className="upload-item-progress-bar"
                  style={{ width: `${fileObj.progress}%` }}
                ></div>
              </div>
              <span>{fileObj.progress}%</span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Choose Menu Upload Method</label>
          <select
            className="form-input"
            value={uploadMethod}
            onChange={(e) => setUploadMethod(e.target.value)}
          >
            <option value="manual">Manually</option>
            <option value="csv">CSV/Excel File</option>
            <option value="dataset">Dataset</option>
          </select>
        </div>

        {uploadMethod === "manual" && (
          <div className="manual-upload">
            <div className="form-group">
              <label className="form-label">Food Image</label>
              <input
                type="file"
                className="form-input"
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Food Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Food Price</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Price"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Food Discount</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Discount"
              />
            </div>
          </div>
        )}

        {uploadMethod === "csv" && (
          <div className="csv-upload">
            <label className="form-label">Upload CSV/Excel File</label>
            <input
              type="file"
              className="form-input"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileSelect}
              multiple
            />
          </div>
        )}

        {uploadMethod === "dataset" && (
          <div className="dataset-upload">
            <label className="form-label">Upload Dataset (Pandas)</label>
            <input
              type="file"
              className="form-input"
              accept=".pkl,.hdf5,.parquet"
              onChange={handleFileSelect}
              multiple
            />
          </div>
        )}

        <div>
          <button type="submit" className="menu-details-submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuDetails;
