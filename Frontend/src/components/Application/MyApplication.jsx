import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResumeModel from './ResumeModel';

const MyApplication = () => {
  const [application, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState('');

  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === 'Employer') {
          const res = await axios.get('https://job-portal-ayfi.onrender.com/api/v2/application/employer/getall', { withCredentials: true });
          setApplication(res.data.applications);
        } else {
          const res = await axios.get('https://job-portal-ayfi.onrender.com/api/v2/application/jobseeker/getall', { withCredentials: true });
          setApplication(res.data.applications);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo('/login');
  }

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`https://job-portal-ayfi.onrender.com/api/v2/application/delete/${id}`, { withCredentials: true });
      setApplication((prevApplication) => prevApplication.filter((app) => app._id !== id));
      toast.success('Application deleted successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className='my_applications page bg-white text-black'>
      <div className='container mx-auto max-w-4xl py-8'>
        <h1 className='text-3xl font-bold mb-8'>My Applications</h1>
        {user && user.role === 'Job Seeker' ? (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {application.length <= 0 ? (
              <p className='text-lg'>No Applications Found</p>
            ) : (
              application.map((element) => (
                <JobSeekerCard key={element._id} element={element} deleteApplication={deleteApplication} openModal={openModal} />
              ))
            )}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {application.map((element) => (
              <EmployerCard key={element._id} element={element} openModal={openModal} />
            ))}
          </div>
        )}
        {modalOpen && <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />}
      </div>
    </section>
  );
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className='bg-black text-white rounded-lg overflow-hidden shadow-md'>
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-4'>{element.name}</h2>
        <p className='mb-2'>
          <span className='font-semibold'>Email:</span> {element.email}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Phone:</span> {element.phone}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Address:</span> {element.address}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Cover Letter:</span> {element.coverLetter}
        </p>
        <div className='mt-4 flex justify-between items-center'>
          <img
            src={element.resume.url}
            alt='resume'
            className='w-12 h-12 rounded-full cursor-pointer'
            onClick={() => openModal(element.resume.url)}
          />
          <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600' onClick={() => deleteApplication(element._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className='bg-black text-white rounded-lg overflow-hidden shadow-md'>
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-4'>{element.name}</h2>
        <p className='mb-2'>
          <span className='font-semibold'>Email:</span> {element.email}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Phone:</span> {element.phone}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Address:</span> {element.address}
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Cover Letter:</span> {element.coverLetter}
        </p>
        <img
          src={element.resume.url}
          alt='resume'
          className='w-12 h-12 rounded-full cursor-pointer'
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
