import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url =
        currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";

      const payload =
        currentState === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(backendUrl + url, payload);

      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      console.log("token mil gaya:", token);

      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#4B5563] px-4 py-12">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl text-white space-y-6 transition-all duration-300"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wide">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            {currentState === "Login"
              ? "Login to access your dashboard"
              : "Register to get started"}
          </p>
        </div>

        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
        />

        <div className="flex justify-between text-xs text-gray-300">
          <p className="hover:text-white cursor-pointer transition">
            Forgot password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="hover:text-white cursor-pointer transition"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="hover:text-white cursor-pointer transition"
            >
              Already have an account?
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
