import React from 'react'
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../static/Team.css"
import Teamcards from '../components/Teamcards';
import {
  FaPhone,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

const Team = () => {
  /* const teamListURL = 'http://localhost:8000/api/team/'
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(teamListURL);
        console.log(response)
        const teamData = await response.json();
        console.log(teamData);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []); */

  const team_names = ["events" , "hbnvfhjs" , "gesfvg" , "grsedfgvs"]
  const team_members = [{name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:
                        { 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }
                        } , 
                        {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:{ 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }} , 
                        {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:{ 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }} , 
                        {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:{ 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }} , 
                        {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:{ 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }} , 
                        {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , contacts:{ 
                          phone:"" ,
                          email:"" ,
                          instagram:"https://www.instagram.com/" ,
                          facebook:"" ,
                          linkedin:"" ,
                        }}]
  return (
    <>
      <h1 className="teams-title">Team Members</h1>
      <div className='teams-box'>
      <Sidebar className='sidebar' team_names={team_names} />
      <div className='card-container'>
        {
          team_members.map((person , index) => (
            <Teamcards className='card' key={index} name={person.name} image={person.image} contacts={person.contacts}/>
          ))

        }
      </div>
      </div>
    </>
  )
}

export default Team