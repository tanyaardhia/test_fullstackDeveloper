import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("masuk login");
      console.log("data before login:", data);

      const responseLogin = await axios.post(
        "http://localhost:3000/login",
        data
      );
      localStorage.setItem("access_token", responseLogin.data.access_token); // Access data properly
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("error login:", error.response || error.message || error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg mx-auto shadow-lg px-6 py-7 bg-white rounded-2xl overflow-hidden">
        <h2 className="text-2xl uppercase font-bold mb-1 text-center">Login</h2>
        <p className="text-gray-600 mb-3 text-sm text-center">
          Welcome, So good to have you back!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="email@domain.com"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="***********"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-[#698474] border border-[#698474] rounded hover:bg-transparent hover:text-[#698474] transition uppercase font-roboto font-medium"
            >
              Login
            </button>
            <div className="flex justify-center gap-2 pt-5">
              <p className="text-gray-600 text-sm">Don't have an account?</p>
              <Link className="text-gray-600 text-sm underline" to="/register">
                Register
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
