import React from 'react'
import './App.css'
import {BrowserRouter ,Router,Routes,Route, Navigate} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { Context } from './main.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Navbar from './components/LayOut/Navbar.jsx'

import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import Myjobs from './components/Job/Myjobs.jsx'
import PostJobs from './components/Job/PostJobs.jsx'
import Application from './components/Application/Application.jsx'
import MyApplication from './components/Application/MyApplication.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context)

  useEffect(()=>{
      const fetchUser = async()=>{
        try {
          const response =await axios.get("https://job-portal-ayfi.onrender.com/api/v2/user/getuser",{withCredentials:true})
          setUser(response.data.user)
          setIsAuthorized(true);
        } catch (error) {
          setIsAuthorized(false);
        }
      }
      fetchUser();
  },[isAuthorized])



  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/job/getall' element={<Jobs/>}/>
        <Route  path='/job/:id' element={<JobDetails/>}/>
        <Route  path='/job/post' element={<PostJobs/>}/>
        <Route  path='/job/me' element={<Myjobs/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        <Route path='/application/me' element={<MyApplication/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    {/* <Footer/> */}
    <Toaster/>
    </BrowserRouter>
  )
}

export default App
