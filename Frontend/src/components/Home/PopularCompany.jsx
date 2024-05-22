import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { SiHcl } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bangalore, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Pune, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Noida, India",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "HCL",
      location: "Gurugram, India",
      openPositions: 20,
      icon: <SiHcl />,
    },
    {
      id: 5,
      title: "Meta",
      location: "Hyderabad, India",
      openPositions: 20,
      icon: <FaMeta />,
    },
  ];

  return (
    <div className="bg-black py-8">
      <div className="container mx-auto">
        <h3 className="text-3xl text-center font-bold mb-8 text-white">Discover Amazing Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="card text-blue-300 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="icon mr-4 text-white ">{company.icon}</div>
                <div className="text">
                  <p className="font-semibold">{company.title}</p>
                  <p className="text-sm">{company.location}</p>
                </div>
              </div>
              <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-md">
                Explore {company.title} Positions
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
