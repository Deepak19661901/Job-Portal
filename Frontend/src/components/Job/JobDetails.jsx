import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';

const JobDetails = () => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState({});
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v2/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  if (!isAuthorized) {
    navigateTo('/login');
  }

  return (
    <div className="bg-white text-black mt-8 md:mt-16 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="flex text-5xl md:text-3xl font-bold mb-4">Job Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=' mt-16'>
            <p className='text-3xl font-bold'>Title: <span className='text-2xl'>{job.title}</span></p>
            <p className='text-3xl font-bold '>Category: <span className='text-2xl' >{job.category}</span></p>
            <p className='text-3xl font-bold'>Country: <span className='text-2xl'>{job.country}</span></p>
            <p className='text-3xl font-bold'>City: <span className='text-2xl'>{job.city}</span></p>
            <p className='text-3xl font-bold'>Location: <span className='text-2xl'>{job.location}</span></p>
            <p className='text-3xl font-bold'>Description: <span className='text-2xl'>{job.description}</span></p>
            <p className='text-3xl font-bold'>Job Posted On: <span className='text-2xl'>{job.jobPostedOn}</span></p>
            <p className='text-3xl font-bold'>
              Salary: {job.fixedSalary ? <span>{job.fixedSalary}</span> : <span>{job.salaryFrom}-{job.salaryTo}</span>}
            </p>
          </div>
          <div className="flex justify-center items-center">
            {user && user.role === 'Employer' ? null : (
              <Link
                to={`/application/${job._id}`}
                className="bg-gray-900 text-white py-2 px-4 rounded inline-block mt-4 md:mt-0"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
