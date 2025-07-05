import React from 'react'
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../static/Team.css"
import Teamcards from '../components/Teamcards';
import FadeLoader from 'react-spinners/FadeLoader'
import { useAuth } from '../context/AuthContext';
import {
  FaPhone,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

const Team = () => {
  const teamListURL = 'https://mananjiwnani.pythonanywhere.com//api/team/'

  const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()
  const [team, setTeamData] = useState([])
  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    const storedInfo = JSON.parse(sessionStorage.getItem("user"))
    if(storedInfo && storedInfo.loggedIn){
      setLoggedIn(true)
      setTeamName(storedInfo.teamName)
    }
  }, [])
  const fetchTeam = async () => {
    try {
      const response = await fetch(teamListURL);
      const data = await response.json();
      setTeamData(data)

    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

  const team_names = ["Backend Developer", "Frontend Developer"]

  return (
    <>
      <h1 className="teams-title"></h1>
      
      <Sidebar className='sidebar' title={"Teams"} list_names={team_names} />
      { team.length>0?
      <div className='teams-box'>
      {
        team_names.map((team_name , index) => (
          <div id={team_name} key={index}>
          <h1 className='teams-subheading'> {team_name}</h1>
          <div className='card-container'>
            {
              team.filter(person=>person.position===team_name).map((person , index) => (
                <Teamcards className='card' key={index} name={person.name} image={person.image} phoneNo={person.phoneNo} emailId = {person.emailId} instagramId={person.instagramId} linkedinId = {person.linkedinId} />
              ))

            }
          </div>
          </div>

        ))

      }
      </div>:
      (
        <div className="team-loader" style={{marginTop:"45vh"}}>

        <div className="loading">
          <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
          <p>Loading Members...</p>
        </div>
        </div>
        )
      }
    </>
  )
}

export default Team