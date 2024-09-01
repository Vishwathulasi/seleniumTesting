// src/components/PersonalInfoPage.js

import React from "react";
import personalInfor from "../../assests/video/dossier.mp4";
import './PersonalInfoPage.css'

const PersonalInfoPage = ({ personalInfo, handlePersonalInfoChange, handleNextClick }) => {
  return (
    <div className="content">
      <div className="personal-info-video-container">
        <video className="personal-info-centered-video" autoPlay loop muted>
          <source src={personalInfor} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="content-heading">Personal Information</h2>
      <form>
        <div className="form-group" id="Personal-Information">
          <label className="form-label">Owner Details</label>
          <input
            type="text"
            className="form-input"
            placeholder="Full Name"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalInfoChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Email Address"
            name="email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Phone Number"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <button type="button" className="personal-info-submit-button" onClick={handleNextClick}>
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoPage;
