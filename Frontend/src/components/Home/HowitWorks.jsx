import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const HowItWorks = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto">
        <h3 className="text-3xl text-center font-bold mb-8">How Career Safltha Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="  rounded-lg shadow-md p-6">
            <FaUserPlus className="text-4xl text-blue-500 mb-4 mx-auto" />
            <p className="text-xl font-semibold mb-2 text-center">Create Account</p>
            <p className="text-center">Join our platform by creating your account.</p>
          </div>

          <div className="  rounded-lg shadow-md p-6">
            <MdFindInPage className="text-4xl text-blue-500 mb-4 mx-auto" />
            <p className="text-xl font-semibold mb-2 text-center">Find a Job / Post a Job</p>
            <p className="text-center">Explore job opportunities or post job listings.</p>
          </div>

          <div className="  rounded-lg shadow-md p-6">
            <IoMdSend className="text-4xl text-blue-500 mb-4 mx-auto" />
            <p className="text-xl font-semibold mb-2 text-center">Login</p>
            <p className="text-center">Login to your account to access all features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
