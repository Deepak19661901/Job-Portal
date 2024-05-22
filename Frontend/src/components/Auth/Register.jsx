import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v2/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
          <div className="text-center">
            <img src="/logos.png" alt="logo" className="mb-4 mx-auto w-24" />
            <h3 className="text-xl font-semibold mb-4">Create a new account</h3>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <label className="block mb-2">Register As</label>
              <div className="flex items-center">
                <select
                  className="w-full py-2 pl-4 pr-10 border rounded-lg appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="absolute right-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <label className="block mb-2">Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <FaPencilAlt className="absolute right-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <label className="block mb-2">Email Address</label>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Dk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <MdOutlineMailOutline className="absolute right-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <label className="block mb-2">Phone Number</label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <FaPhoneFlip className="absolute right-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <label className="block mb-2">Password</label>
              <div className="flex items-center">
                <input
                  type={showPassword?"text":"password"}
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border rounded-lg"
                />
                <RiLock2Fill className="absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
            <Link to={"/login"} className="block text-center mt-4 text-blue-500">Login Now</Link>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <img
          src="/registers.png"
          alt="register"
          className="max-h-full w-auto md:w-2/3 lg:w-1/2"
        />
      </div>
    </section>
  );
};

export default Register;
