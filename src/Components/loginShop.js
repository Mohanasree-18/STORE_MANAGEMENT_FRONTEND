import React, { useEffect, useState } from "react";
import ShopCard from "./shopCard";
import LoginForm from "./Login";
import { useSelector } from "react-redux";

function Singleshop() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {user ? <ShopCard shop={user} /> : <p>Loading...</p>}
    </div>
  );
}
export default Singleshop;
