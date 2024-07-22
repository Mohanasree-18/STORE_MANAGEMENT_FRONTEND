import React from "react";

const ShopCard = ({ shop }) => {
  const {
    shopName,
    email,
    ownerName,
    address,
    city,
    pincode,
    latitude,
    longitude,
  } = shop;

  return (
    <div className="flex flex-col p-8 bg-white shadow-lg rounded-lg max-w-lg border border-gray-300">
      <h3 className="text-2xl font-semibold text-peach-600 mb-3">{shopName}</h3>
      <p className="text-lg text-peach-500">{ownerName}</p>
      <p className="text-md text-peach-400 mt-1">{email}</p>
      <p className="text-md text-peach-400 mt-1">
        {address}, {city}, {pincode}
      </p>
      <p className="text-md text-peach-400 mt-1">
        Lat: {latitude}, Long: {longitude}
      </p>
    </div>
  );
};

export default ShopCard;
