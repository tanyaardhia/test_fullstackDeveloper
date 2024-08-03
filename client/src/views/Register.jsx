import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("masuk registration");
      console.log("Data before sending:", data);
      const responseRegister = await axios.post(
        "http://localhost:3000/register",
        data
      );
      console.log("response >>>", responseRegister.data);
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(
        "error registration:",
        error.response || error.message || error
      );
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4" style={{ backgroundImage: "url('../public/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-lg mx-auto shadow-lg px-6 py-7 bg-white rounded-2xl overflow-hidden">

      <a href="/">
        <div className="flex justify-center items-center">
          <img
            src="../public/logo.png"
            alt="logo"
            className="h-42 w-56 -m-0 mb-5"
          />
        </div>
        </a>

        <h2 className="text-lg uppercase font-bold mb-1 text-center">
          Sign up for your PrimeHeadlines account
        </h2>
        <p className="text-gray-600 mb-3 text-sm text-center">
          please create your account here!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-gray-600 mb-2 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-xl focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="your name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-xl focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="08xxxxxxxx"
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-xl focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="email@domain.com"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-xl focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="***********"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-[#7FA1C3] border border-[#7FA1C3] rounded-xl hover:bg-transparent hover:text-[#7FA1C3] transition uppercase font-roboto font-medium"
            >
              Register
            </button>
            <div className="flex justify-center pt-5">
              <p className="text-gray-600 text-sm">Already have an account?</p>
              <Link className="text-gray-600 text-sm ml-1 hover:font-semibold hover:text-[#6482AD]" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
