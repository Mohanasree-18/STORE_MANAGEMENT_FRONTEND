import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaKey,
} from "react-icons/fa";
import { registerAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//!VALIDATIONS
const validationSchema = Yup.object({
  shopName: Yup.string().required("ShopName is required"),
  ownerName: Yup.string().required("OwnerName is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  latitude: Yup.number()
    .nullable()
    .test(
      "is-valid-latitude",
      "Latitude must be between -90 and 90",
      (value) =>
        value === null || (value !== undefined && value >= -90 && value <= 90)
    ),
  longitude: Yup.number()
    .nullable()
    .test(
      "is-valid-longitude",
      "Longitude must be between -180 and 180",
      (value) =>
        value === null || (value !== undefined && value >= -180 && value <= 180)
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  //!Navigate
  const navigate = useNavigate();
  //!MUTATION
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      shopName: "",
      ownerName: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      latitude: null,
      longitude: null,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //!MAKING HTTP REQUEST
      mutateAsync(values)
        .then((data) => {
          console.log(data);
          //!dispatch data to redux store

          //!save user in localStorage
        })
        .catch((e) => console.log(e));
    },
  });
  //!Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 1000);
  }, [isLoading, isError, error, isSuccess]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Register
      </h2>
      {isLoading && <AlertMessage type="loading" message="Please wait...." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Your Store Registration was Successful!"
        />
      )}
      <p className="text-sm text-center text-gray-500">
        Register your store digitally
      </p>

      {/* Input Field - Shop Name */}
      <div className="relative">
        <FaHome className="absolute top-3 left-3 text-gray-400" />
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
      <div className="relative">
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

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Address */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
        <input
          id="address"
          type="text"
          {...formik.getFieldProps("address")}
          placeholder="Address"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.address && formik.errors.address && (
          <span className="text-xs text-red-500">{formik.errors.address}</span>
        )}
      </div>

      {/* Input Field - City */}
      <div className="relative">
        <FaCity className="absolute top-3 left-3 text-gray-400" />
        <input
          id="city"
          type="text"
          {...formik.getFieldProps("city")}
          placeholder="City"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.city && formik.errors.city && (
          <span className="text-xs text-red-500">{formik.errors.city}</span>
        )}
      </div>

      {/* Input Field - Pincode */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
        <input
          id="pincode"
          type="text"
          {...formik.getFieldProps("pincode")}
          placeholder="Pincode"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.pincode && formik.errors.pincode && (
          <span className="text-xs text-red-500">{formik.errors.pincode}</span>
        )}
      </div>

      {/* Input Field - Latitude */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
        <input
          id="latitude"
          type="text"
          {...formik.getFieldProps("latitude")}
          placeholder="Latitude"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.latitude && formik.errors.latitude && (
          <span className="text-xs text-red-500">{formik.errors.latitude}</span>
        )}
      </div>

      {/* Input Field - Longitude */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
        <input
          id="longitude"
          type="text"
          {...formik.getFieldProps("longitude")}
          placeholder="Longitude"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.longitude && formik.errors.longitude && (
          <span className="text-xs text-red-500">
            {formik.errors.longitude}
          </span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Input Field - Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#e48f0f] to-[#f4a03d] hover:from-[#e48f0f] hover:to-[#f4a03d] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
