import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get("https://job-portal-ayfi.onrender.com/api/v2/job/getall", { withCredentials: true })
      .then((res) => {
        setJobs(res.data.jobs);
        setSearchResult(res.data.jobs);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
      });
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      setIsSearching(true);
      const filterData = jobs.filter(data =>
        data.title.toLowerCase().includes(searchTerm)
      );
      setSearchResult(filterData);
    } else {
      setIsSearching(false);
      setSearchResult(jobs);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto">
        <h1 className="text-4xl mt-4 mb-5 font-bold text-center">Explore Exciting Job Opportunities</h1>

        {/* Sticky Search Bar */}
        <div className="sticky top-0 z-10 w-full bg-black p-4">
          <input
            style={{ color: "black" }}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Search Job"
            onChange={handleChange}
          />
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {searchResult.length > 0 ? (
            searchResult.map((element) => (
              <div className="border-2 border-gold rounded-lg p-6 hover:shadow-lg transition duration-300" key={element._id}>
                <h3 className="text-xl font-semibold mb-2">{element.title}</h3>
                <p className="text-sm mb-4">{element.category}</p>
                <p className="text-sm mb-4">{element.country}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
