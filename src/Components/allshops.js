import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./shopCard";

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch all shops from the server
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/shops/allshops"
        );
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 bg-gray-200 p-8">
      {shops.length > 0 ? (
        shops.map((shop) => <ShopCard key={shop.id} shop={shop} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShopList;
