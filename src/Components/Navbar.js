/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  //!DISPATCH
  const dispatch = useDispatch();
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
        <a href="/register">Register</a>
        <a href="/login">Login</a>
        <a href="/search">Search</a>
        <button onClick={logoutHandler} className="primary-button">
          Home
        </button>
      </div>

      <div className="navbar-menu-container"></div>
    </nav>
  );
};

export default Navbar;
