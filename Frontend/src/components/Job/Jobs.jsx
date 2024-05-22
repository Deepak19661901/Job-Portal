import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/v2/job/getall", { withCredentials: true })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
      });
  }, []);

  console.log(jobs);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="bg-black text-white min-h-screen flex justify-center items-center ">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-8 font-bold">Explore Exciting Job Opportunities</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
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
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
