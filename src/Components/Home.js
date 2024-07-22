import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import cloth from "../Assets/cloth.jpg";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/allshops");
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">Browse All your Favourite Brands</h1>
          <p className="primary-text">
            "Register, Update, Delete, and Discover Nearby Stores with Ease!"
          </p>
          <button className="secondary-button" onClick={handleClick}>
            View all stores
          </button>
        </div>
        <div className="home-image-section">
          <img src={cloth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
