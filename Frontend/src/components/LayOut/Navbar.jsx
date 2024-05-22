import React, { useContext, useState } from 'react';
import { Context } from '../../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v2/user/logout', {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo('/login');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={`bg-red text-white fixed top-0   w-full z-50 ${isAuthorized ? 'block' : 'hidden'}`}>
        <div className=' mx-auto flex justify-between items-center '>
          {/* Reduced padding on the Navbar */}
          <div className='h-16 w-14 mt-2'>
            <img className='bg-white rounded-lg '  src='/logo.png' alt='logo' />
          </div>
          <ul className={` ${show ? 'flex' : 'hidden'} space-x-4 md:space-x-8 md:flex`}>
            <li>
              <Link to={'/'} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={'/job/getall'} onClick={() => setShow(false)}>
                All JOBS
              </Link>
            </li>
            <li>
              <Link to={'/application/me'} onClick={() => setShow(false)}>
                {user && user.role === 'Employer' ? "APPLICANT'S APPLICATIONS" : 'MY APPLICATIONS'}
              </Link>
            </li>
            {user && user.role === 'Employer' ? (
              <>
                <li>
                  <Link to={'/job/post'} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={'/job/me'} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
          <div className='hamburger md:hidden'>
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
      <div className='pt-16'></div> {/* Add padding to the content below to prevent overlap */}
    </>
  );
};

export default Navbar;
