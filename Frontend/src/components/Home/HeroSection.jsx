import React from 'react'
import {FaSuitcase,FaBuilding,FaUsers,FaUserPlus} from 'react-icons/fa'
const HeroSection = () => {

  const details=[
    {
      id:1,
      title:"1,23,444",
      subTitle:"Live Job",
      icon:<FaSuitcase/>,
    },
    {
      id:2,
      title:"91220",
      subTitle:"companies",
      icon:<FaBuilding/>
    },
    {
      id:3,
      title:"9,23,444",
      subTitle:"Job seekers",
      icon:<FaUsers/>
    },
    {
      id:4,
      title:"1,03,761",
      subTitle:"Employees",
      icon:<FaUserPlus/>
    },
  

  ]

  return (
    <div className='heroSection'>
      <div className='container'>
        <div className='title'>
          <h1>Find a Job that suits you</h1>
          <h1>Your Intersert and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias culpa ducimus impedit voluptatibus quia tempora similique harum nulla, aperiam quos repellat consequatur ex expedita architecto. Dolores inventore quasi quidem tempore omnis labore amet quis iure!
          </p>
        </div>
        <div className='image'>
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>

      <div className='details'>
        {
          details.map(element=>{
            return(
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>

              </div>
            )
          })
        }

      </div>
      
    </div>
  )
}

export default HeroSection
