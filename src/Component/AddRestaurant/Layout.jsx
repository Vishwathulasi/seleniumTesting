// src/components/Layout.js

import React, { useState } from "react";
import "./Layout.css";
import businessMan from "../../assests/image/businessman.png";
import { Snackbar } from "@mui/material";
import rest from "../../assests/video/restaurant.mp4";
import MuiAlert from "@mui/material/Alert";

import PersonalInfoPage from "./PersonalInfoPage";
import RestaurantInfoPage from "./RestaurantInfoPage";
import MenuDetails from "./MenuDetails";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: "",
    restaurantNumber: "",
    restaurantEmail: "",
    address1: "",
    address2: "",
    city: "",
    landmark: "",
    videoSrc: rest,
  });

  const [currentPage, setCurrentPage] = useState("personalInfo");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleRestaurantInfoChange = (e) => {
    setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value });
  };

  const isPersonalInfoFilled = () => {
    return personalInfo.fullName && personalInfo.email && personalInfo.phone;
  };

  const isRestaurantInfoFilled = () => {
    return (
      restaurantInfo.restaurantName &&
      restaurantInfo.address2 &&
      restaurantInfo.city
    );
  };

  const handleNextClick = () => {
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (currentPage === "personalInfo") {
      if (personalInfo.email && !emailPattern.test(personalInfo.email)) {
        setSnackbarMessage("Please enter a valid email address.");
        setSnackbarOpen(true);
        return;
      }

      if (personalInfo.phone && !phonePattern.test(personalInfo.phone)) {
        setSnackbarMessage("Please enter a valid 10-digit phone number.");
        setSnackbarOpen(true);
        return;
      }

      if (!personalInfo.fullName || !personalInfo.email || !personalInfo.phone) {
        setSnackbarMessage("All details must be filled.");
        setSnackbarOpen(true);
        return;
      }

      setCurrentPage("restaurantInfo");
    } else if (currentPage === "restaurantInfo") {
      if (restaurantInfo.restaurantEmail && !emailPattern.test(restaurantInfo.restaurantEmail)) {
        setSnackbarMessage("Please enter a valid official email address.");
        setSnackbarOpen(true);
        return;
      }

      if (restaurantInfo.restaurantNumber && !phonePattern.test(restaurantInfo.restaurantNumber)) {
        setSnackbarMessage("Please enter a valid 10-digit restaurant contact number.");
        setSnackbarOpen(true);
        return;
      }

      if (
        !restaurantInfo.restaurantName ||
        !restaurantInfo.restaurantNumber ||
        !restaurantInfo.restaurantEmail ||
        !restaurantInfo.address2 ||
        !restaurantInfo.city
      ) {
        setSnackbarMessage("All details must be filled.");
        setSnackbarOpen(true);
        return;
      }

      setCurrentPage("menuDetails");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const getCurrentPageContent = () => {
    switch (currentPage) {
      case "personalInfo":
        return (
          <PersonalInfoPage
            personalInfo={personalInfo}
            handlePersonalInfoChange={handlePersonalInfoChange}
            handleNextClick={handleNextClick}
          />
        );
      case "restaurantInfo":
        return (
          <RestaurantInfoPage
            restaurantInfo={restaurantInfo}
            handleRestaurantInfoChange={handleRestaurantInfoChange}
            handleNextClick={handleNextClick}
          />
        );
      case "menuDetails":
        return <MenuDetails />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="layout-container">
        <div className="sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-heading">Complete your registration</h2>
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <div
                  className={`sidebar-item-content ${
                    isPersonalInfoFilled() ? "filled" : ""
                  } ${currentPage === "personalInfo" ? "active" : ""}`}
                >
                  <span className="sidebar-icon">
                    <img src={businessMan} alt="" style={{ height: "20px" }} />
                  </span>{" "}
                  Personal Information
                </div>
              </li>
              <li className="sidebar-item">
                <div
                  className={`sidebar-item-content ${
                    isRestaurantInfoFilled() ? "filled" : ""
                  } ${currentPage === "restaurantInfo" ? "active" : ""}`}
                >
                  <span className="sidebar-icon">📍</span> Restaurant Information
                </div>
              </li>
              <li className="sidebar-item">
                <div
                  className={`sidebar-item-content ${
                    currentPage === "menuDetails" ? "active" : ""
                  }`}
                >
                  <span className="sidebar-icon">📋</span> Menu and Operational
                  Details
                </div>
              </li>
            </ul>
          </div>
        </div>
        {getCurrentPageContent()}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Layout;
