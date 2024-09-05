import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume)
  }

  const handleApplication = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
  
    try {
      const { data } = await axios.post("https://job-portal-ayfi.onrender.com/api/v2/application/post", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
  
      // Delay the redirect by 1 second to ensure the toast message is visible
      setTimeout(() => {
        navigateTo("/job/getall");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  

  if (!isAuthorized || (user && user.role === 'Employer')) {
    navigateTo("");
  }

  return (
    <section className='bg-white text-black py-8'>
      <div className="container mx-auto max-w-lg">
        <h3 className="text-2xl font-bold mb-4">Application Form</h3>
        <form onSubmit={handleApplication} className="space-y-4">
          <input type="text" placeholder='Your Name' value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />

          <input type="email" placeholder='Your Email' value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />

          <input type="number" placeholder='Your Phone' value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />

          <input type="text" placeholder='Your Address' value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />

          <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder='Cover Letter'
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />

          <div>
            <label className="block text-lg mb-2">Select Resume</label>
            <input type="file" accept='.jpg,.png,.webp' onChange={handleFileChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            />
          </div>

          <button type='submit' className="bg-gray-900 text-white py-2 px-4 rounded-md">Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Application;
