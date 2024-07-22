import BASE_URL from "../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../utils/getUserFromStorage";

//!LOGIN API
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post("https://store-management-backend-2c74.vercel.app/login", {
    email,
    password,
  });
  //return promise
  return response.data;
};

//!REGISTER API
export const registerAPI = async ({
  shopName,
  email,
  password,
  ownerName,
  address,
  city,
  pincode,
  latitude,
  longitude,
}) => {
  const response = await axios.post(
    "https://store-management-backend-2c74.vercel.app/register",
    {
      shopName,
      email,
      password,
      ownerName,
      address,
      city,
      pincode,
      latitude,
      longitude,
    }
  );
  //return promise
  return response.data;
};

//!UPDATE SHOP API
export const updateAPI = async (shopData) => {
  const token = getUserFromStorage(); // Assuming you store your token in localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "https://store-management-backend-2c74.vercel.app/update",
    shopData,
    config
  );
  return response.data;
};

//!DELETE SHOP API
export const deleteAPI = async () => {
  const token = getUserFromStorage(); // Assuming you store your token in localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    "https://store-management-backend-2c74.vercel.app/delete",
    config
  );
  return response.data;
};

//!NEARER SHOP API
export const nearAPI = async () => {
  const token = getUserFromStorage(); // Assuming you store your token in localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    "https://store-management-backend-2c74.vercel.app/nearme",
    config
  );
  return response.data;
};

//!SEARCHAPI
export const searchAPI = async (query) => {
  const token = getUserFromStorage(); // Assuming you store your token in localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Construct the URL with the search query
  const response = await axios.get(
    `https://store-management-backend-2c74.vercel.app/search/${query}`,
    config
  );

  return response.data;
};
