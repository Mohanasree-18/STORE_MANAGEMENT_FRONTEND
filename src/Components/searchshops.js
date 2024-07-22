import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { FaStore } from "react-icons/fa";
import { searchAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import ShopCard from "./shopCard";
import { useNavigate } from "react-router-dom";

//!FORM VALIDATIONS
const validationSchema = Yup.object({
  shopName: Yup.string().required("Shop name is required"),
});

const SearchForm = () => {
  const [shopName, setShopName] = useState("");

  //!Navigate
  const navigate = useNavigate();

  //!QUERY
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    ["searchShops", shopName],
    () => searchAPI(shopName),
    {
      enabled: !!shopName, // Only run the query if shopName is not empty
    }
  );
  console.log(data);
  const formik = useFormik({
    initialValues: {
      shopName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setShopName(values.shopName);
    },
  });

  return (
    <div className="search-component">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Search Shop
        </h2>
        {/* Display messages */}
        {isLoading && <AlertMessage type="loading" message="Searching..." />}
        {isError && <AlertMessage type="error" message="No Stores Found" />}
        {isSuccess && !data?.length && (
          <div className="text-3xl text-center text-gray-600 mt-10">
            No stores found
          </div>
        )}
        <p className="text-sm text-center text-gray-500">
          Enter the shop name to search.
        </p>

        {/* Input Field - Shop Name */}
        <div className="relative mb-4">
          <FaStore className="absolute top-3 left-3 text-gray-400" />
          <input
            id="shopName"
            type="text"
            {...formik.getFieldProps("shopName")}
            placeholder="Shop Name"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.shopName && formik.errors.shopName && (
            <span className="text-xs text-red-500">
              {formik.errors.shopName}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#e48f0f] to-[#f4a03d] hover:from-[#e48f0f] hover:to-[#f4a03d] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Search
        </button>
      </form>

      {/* Display Search Result */}
      {data && (
        <div className="shop-card-container">
          {data.length > 0 ? (
            data.map((shop, index) => <ShopCard key={index} shop={shop} />)
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

export default SearchForm;
