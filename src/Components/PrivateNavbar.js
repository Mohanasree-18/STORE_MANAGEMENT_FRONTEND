import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { deleteAPI } from "../Api/shopServices";
import DeleteComponent from "./Deleteshop";

const PrivateNavbar = () => {
  //navigate
  const navigate = useNavigate();
  //!DISPATCH
  const dispatch = useDispatch();
  //!logouthandler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove from localstorage
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-logo-container"></div>

      <div className="navbar-links-container">
        <a href="/update"> Update Store</a>
        <a href="/delete">Delete Store</a>
        <a href="/nearme">Stores near me</a>

        <button onClick={logoutHandler} className="primary-button">
          Logout
        </button>
      </div>

      <div className="navbar-menu-container"></div>
    </nav>
  );
};
export default PrivateNavbar;
