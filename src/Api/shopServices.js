import BASE_URL from "../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../utils/getUserFromStorage";

//!LOGIN API
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post("http://localhost:8000/api/shops/login", {
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
    "http://localhost:8000/api/shops/register",
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
    "http://localhost:8000/api/shops/update",
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
    "http://localhost:8000/api/shops/delete",
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
    "http://localhost:8000/api/shops/nearme",
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
    `http://localhost:8000/api/shops/search/${query}`,
    config
  );

  return response.data;
};
