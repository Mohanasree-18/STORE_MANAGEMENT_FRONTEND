import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { FaStore, FaUser } from "react-icons/fa";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { updateAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import { loginAction } from "../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginShop from "./loginShop";

//!FORM VALIDATIONS
const validationSchema = Yup.object({
  shopName: Yup.string(),
  ownerName: Yup.string(),
}).test(
  "at-least-one",
  "Either Shop Name or Owner Name is required",
  function (value) {
    return !!(value.shopName || value.ownerName);
  }
);

const UpdateForm = () => {
  //!Navigate
  const navigate = useNavigate();
  //!DISPATCH
  const dispatch = useDispatch();
  //!MUTATAION
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: updateAPI,
    mutationKey: ["update"],
  });

  const formik = useFormik({
    initialValues: {
      shopName: "",
      ownerName: "",
    },
    //validate based on the above validation schema
    validationSchema,
    //submit
    onSubmit: (values) => {
      console.log(values);
      //!MAKING HTTP REQUEST
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Update Form
      </h2>
      {/* Display messages */}
      {isLoading && <AlertMessage type="loading" message="please...." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Updated Successfully" />
      )}
      <p className="text-sm text-center text-gray-500">
        Life needs Updation, What about your store..
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
          <span className="text-xs text-red-500">{formik.errors.shopName}</span>
        )}
      </div>

      {/* Input Field - Owner Name */}
      <div className="relative mb-4">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="ownerName"
          type="text"
          {...formik.getFieldProps("ownerName")}
          placeholder="Owner Name"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <span className="text-xs text-red-500">
            {formik.errors.ownerName}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#e48f0f] to-[#f4a03d] hover:from-[#e48f0f] hover:to-[#f4a03d] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
