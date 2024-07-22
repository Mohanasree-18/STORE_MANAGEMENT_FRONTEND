import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { FaEnvelope } from "react-icons/fa";
import { deleteAPI } from "../Api/shopServices";
import AlertMessage from "./Alertmsg";
import { logoutAction } from "../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//!FORM VALIDATIONS
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const DeleteForm = () => {
  //!Navigate
  const navigate = useNavigate();
  //!DISPATCH
  const dispatch = useDispatch();
  //!MUTATION
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: deleteAPI,
    mutationKey: ["delete"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    //validate based on the above validation schema
    validationSchema,
    //submit
    onSubmit: async (values) => {
      if (window.confirm("Do you really want to delete this shop?")) {
        try {
          await mutateAsync();
          alert("Deletion successful, Redirecting you to Home page");
          dispatch(logoutAction());
          localStorage.removeItem("userInfo");
          navigate("/");
        } catch (e) {
          console.error(e);
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Delete Store
      </h2>
      {/* Display messages */}
      {isLoading && <AlertMessage type="loading" message="Deletingg..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Deleted Successfully" />
      )}
      <p className="text-sm text-center text-gray-500">
        Are you sure you want to delete your store? Please confirm your email.
      </p>

      {/* Input Field - Email */}
      <div className="relative mb-4">
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#e48f0f] to-[#f4a03d] hover:from-[#e48f0f] hover:to-[#f4a03d] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteForm;
