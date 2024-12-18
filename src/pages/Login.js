import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backdrop.jpg')" }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      <div className="z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-6xl px-6">
        {/* Hero Section */}
        <div className="lg:w-1/2 text-white text-left space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>
          <p className="text-lg">
            Log in to continue exploring the platform. We're excited to have you
            back!
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl w-[420px] lg:ml-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h3>

          <div className="mb-4">
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-fill"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-fill"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-hero-pink"
          >
            Submit
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            New user?{' '}
            <a href="/register" className="text-pink-600 hover:underline">
              Register Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
