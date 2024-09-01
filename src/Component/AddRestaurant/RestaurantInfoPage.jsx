// src/components/RestaurantInfoPage.js

import React from "react";
import "./RestaurantInfoPage.css";

const RestaurantInfoPage = ({
  restaurantInfo,
  handleRestaurantInfoChange,
  handleNextClick,
}) => {
  return (
    <div className="content">
      <div className="restaurant-info-video-container">
        <video className="restaurant-info-centered-video" autoPlay loop muted>
          <source src={restaurantInfo.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="content-heading">Restaurant Information</h2>
      <form>
        <div className="form-group" id="Restaurant-Information">
          <label className="form-label">Restaurant Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Restaurant Name"
            name="restaurantName"
            value={restaurantInfo.restaurantName}
            onChange={handleRestaurantInfoChange}
          />
        </div>
        <div className="form-group" id="Restaurant-Information">
          <label className="form-label">Restaurant Contact Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="Restaurant Contact Number"
            name="restaurantNumber"
            value={restaurantInfo.restaurantNumber}
            onChange={handleRestaurantInfoChange}
          />
        </div>
        <div className="form-group" id="Restaurant-Information">
          <label className="form-label">Official Email Address</label>
          <input
            type="text"
            className="form-input"
            placeholder="Official Email Address"
            name="restaurantEmail"
            value={restaurantInfo.restaurantEmail}
            onChange={handleRestaurantInfoChange}
          />
        </div>
        <div className="form-group" id="Restaurant-Information">
          <label className="form-label">Restaurant Address Details</label>
          <input
            type="text"
            className="form-input"
            placeholder="Shop no./Building no. (optional)"
            name="address1"
            value={restaurantInfo.address1}
            onChange={handleRestaurantInfoChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Area/Sector/Locality*"
            name="address2"
            value={restaurantInfo.address2}
            onChange={handleRestaurantInfoChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="City"
            name="city"
            value={restaurantInfo.city}
            onChange={handleRestaurantInfoChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Add any nearby landmark (optional)"
            name="landmark"
            value={restaurantInfo.landmark}
            onChange={handleRestaurantInfoChange}
          />
        </div>
        <button
          type="button"
          className="restaurant-info-submit-button"
          onClick={handleNextClick}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RestaurantInfoPage;
