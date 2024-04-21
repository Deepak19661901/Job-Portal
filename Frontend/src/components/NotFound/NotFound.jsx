import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='flex flex-col md:flex-row items-center justify-center gap-6 bg-gray-100 min-h-screen '>
      <div className='text-center mx-auto'>
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Page Not Found
        </h1>
        <p className='text-lg text-gray-800 mb-6'>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link
          to={"/"}
          className='bg-red-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-red-700 transition-colors duration-300 inline-block'
        >
          Back to Home Page
        </Link>
      </div>
     
    </section>
  );
}

export default NotFound;
