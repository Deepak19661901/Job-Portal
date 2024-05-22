import React, { useContext } from 'react';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';
import PopularCompany from './PopularCompany';

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return (
    <section className='homePage page'>
      <HeroSection />
      <div className="my-[0.5px]"></div> 
      <HowItWorks />
      <div className="my-[0.5px]"></div>
      <PopularCategories />
      <div className="my-[0.5px]"></div> 
      <PopularCompany />
      <div className="my-[0.5px]"></div> 
    </section>
  );
};

export default Home;
