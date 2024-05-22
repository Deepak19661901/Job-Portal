import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={`flex flex-col md:flex-row ${isAuthorized ? 'footerShow' : 'footerHide'}`} style={{ background: 'black' }}>
      <div className="p-3 bg-gray-900 text-white">
        &copy; All Rights reserved By CareerSafaltha
      </div>
      <div className="flex justify-center md:justify-end p-3 bg-gray-900 text-white">
        <Link to="/" target='_blank'><FaFacebookF /></Link>
        <Link to="/" target='_blank'><FaYoutube /></Link>
        <Link to="/" target='_blank'><FaLinkedin /></Link>
        <Link to="/" target='_blank'><RiInstagramFill /></Link>
      </div>
    </footer>
  );
}

export default Footer;
