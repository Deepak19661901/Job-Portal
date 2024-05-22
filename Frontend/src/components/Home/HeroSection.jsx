import React from 'react';
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from 'react-icons/fa';

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,444",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "companies",
      icon: <FaBuilding />
    },
    {
      id: 3,
      title: "9,23,444",
      subTitle: "Job seekers",
      icon: <FaUsers />
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employees",
      icon: <FaUserPlus />
    },
  ];

  return (
    <div className='heroSection bg-black text-white py-16'>
      <div className='container mx-auto flex flex-col md:flex-row'>
        <div className='title md:w-1/2'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4'>Unlock Your Potential: Find a Job That Matches Your Passion and Skills</h1>
          <p className='text-lg md:text-xl mb-8'>Explore opportunities that align with your passions and utilize your unique skills to make a meaningful impact in your career journey.</p>
        </div>
        <div className='image md:w-1/2'>
          <img src="/heroSS.png" alt="hero" className='w-full object-cover rounded-lg' />
        </div>
      </div>

      <div className=' mt-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {details.map(element => (
          <div className="card flex flex-col items-center" key={element.id}>
            <div className="icon text-5xl mb-2">{element.icon}</div>
            <div className="content text-center">
              <p className='font-semibold text-xl'>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
