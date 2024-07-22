import React from "react";
import { useQuery } from "react-query";
import { nearAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import ShopCard from "./shopCard";

const NearComponent = () => {
  const { data, isLoading, isError, error } = useQuery("nearShops", nearAPI);

  console.log(data);

  return (
    <div className="near-component">
      {isLoading && (
        <AlertMessage type="loading" message="Loading nearby shops..." />
      )}
      {isError && <AlertMessage type="error" message={error.message} />}
      {data && data.nearbyShops && Array.isArray(data.nearbyShops) && (
        <div className="shop-cards-container">
          {data.nearbyShops.length > 0 ? (
            data.nearbyShops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} />
            ))
          ) : (
            <div className="text-3xl text-center text-gray-600 mt-10">
              No stores found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NearComponent;
