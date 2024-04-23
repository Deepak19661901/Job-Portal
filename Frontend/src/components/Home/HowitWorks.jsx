import React from 'react'
import {FaUserPlus} from 'react-icons/fa'
import { MdFindInPage}from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'
const HowItWorks = () => {
  return (
    <div className='howitworks'>
    <div className="container">
      <h3>How Carrer Safltha Works</h3>
      <div className='banner'>
      <div className="card">
        <FaUserPlus/>
        <p>Create Account</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti iusto, dolore maiores officiis accusamus.</p>
      </div>

      <div className="card">
        <MdFindInPage/>
        <p>Find a Job post a job</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti iusto, dolore maiores officiis accusamus.</p>
      </div>

      <div className="card">
        <IoMdSend/>
        <p>Login</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti iusto, dolore maiores officiis accusamus.</p>
      </div>

      </div>
    </div>
      
    </div>
  )
}

export default HowItWorks
