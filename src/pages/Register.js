import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set display name in the user profile
      await updateProfile(user, {
        displayName: `${fname} ${lname}`.trim(), // Use fname and lname
      });

      // Save additional user details to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });

      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      // Clear the form (optional)
      setEmail("");
      setPassword("");
      setFname("");
      setLname("");
    } catch (error) {
      console.error("Registration error:", error.message);
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
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md lg:ml-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign Up
          </h3>

          <div className="mb-4">
            <label className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-fill"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-fill"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

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
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already registered?{' '}
            <a href="/login" className="text-pink-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
