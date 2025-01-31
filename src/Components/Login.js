import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import { loginAction } from "../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginShop from "./loginShop";

//!FORM VALIDATIONS
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  //!Navigate
  const navigate = useNavigate();
  //!DISPATCH
  const dispatch = useDispatch();
  //!MUTATAION
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validate based on the above validation schema
    validationSchema,
    //submit
    onSubmit: (values) => {
      console.log(values);
      //!MAKING HTTP REQUEST
      mutateAsync(values)
        .then((data) => {
          //!dispatch data to redux store
          dispatch(loginAction(data));
          //!save user in loaclstorage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });
  //!Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/loginShop");
      }
    }, 1000);
  }, [isLoading, isError, error, isSuccess]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}
      {isLoading && <AlertMessage type="loading" message="Login you in...." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && <AlertMessage type="success" message="Login success" />}
      <p className="text-sm text-center text-gray-500">
        Login to acess your store
      </p>

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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#e48f0f] to-[#f4a03d] hover:from-[#e48f0f] hover:to-[#f4a03d] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
