import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v2/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);

      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Left Section - Image and Quotes */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">"The future belongs to those who believe in the beauty of their dreams."</h2>
          <p className="text-lg text-gray-700">— Eleanor Roosevelt</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex md:w-1/2 justify-center items-center bg-white">
        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/logo.png" alt="logo" className="mx-auto w-24 h-24 object-contain" />
            <h3 className="text-2xl font-semibold text-gray-700">Login to your account</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Login As</label>
              <div className="relative">
                <select
                  className="w-full py-2 pl-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Dk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MdOutlineMailOutline className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <RiLock2Fill className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <Link to="/register" className="block text-center mt-4 text-blue-500 hover:underline">
              Register
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
