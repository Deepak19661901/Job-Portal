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
    return <Navigate to={'/'} />;
  }

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-white flex justify-center items-center">
        <div className="max-w-md w-full p-8">
          <div className="text-center mb-4">
            <img src="/logo.png" alt="logo" className="mx-auto w-24" />
            <h3 className="text-xl font-semibold">Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Login As</label>
              <div className="relative">
                <select
                  className="w-full py-2 pl-4 pr-10 border rounded-lg appearance-none"
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
              <label className="block mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Dk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <MdOutlineMailOutline className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <RiLock2Fill className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
            <Link to={"/register"} className="block text-center mt-4 text-blue-500">Register</Link>
          </form>
        </div>
      </div>
      <div className=" hidden md:block w-96 h-96 rounded-lg  mt-52">
        <img
          src="/logins.png"
          alt="login"
          className="w-full h-full object-cover object-center shadow-md"
        />
      </div>
    </section>
  );
};

export default Login;
