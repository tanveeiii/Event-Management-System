import "../static/Events.css";
import Timeline from '../components/Timeline';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import FadeLoader from 'react-spinners/FadeLoader'
import { useAuth } from "../context/AuthContext";

const Events = () => {

  const [activeDay, setActiveDay] = useState("Day0");
  const [loading, setloading] = useState(true)
  const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()
  useEffect(() => {
    const storedInfo = JSON.parse(sessionStorage.getItem("user"))
    if(storedInfo && storedInfo.loggedIn){
      setLoggedIn(true)
      setTeamName(storedInfo.teamName)
    }
  }, [])

  const handleTabClick = (day) => {
    setActiveDay(day);
  };

  const [eventsData, setEventsData] = useState([])


  const eventListURL = 'https://mananjiwnani.pythonanywhere.com//api/event/'
  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
    console.log("Updated eventsData:", eventsData); 
  }, [eventsData]);
  useEffect(() => { 
  }, [activeDay]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(eventListURL);
      const data = await response.json();
      setEventsData(data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }finally {
      setloading(false);
    }
  };



  return (
    <>
      {/* <h1 className="schedule-title">Schedule</h1> */}
      <div className="tabs">
        <button
          className={`tab-link ${activeDay === "Day0" ? "active" : ""}`}
          onClick={() => handleTabClick("Day0")}
        >
          Day 0
        </button>
        <button
          className={`tab-link ${activeDay === "Day1" ? "active" : ""}`}
          onClick={() => handleTabClick("Day1")}
        >
          Day 1
        </button>
        <button
          className={`tab-link ${activeDay === "Day2" ? "active" : ""}`}
          onClick={() => handleTabClick("Day2")}
        >
          Day 2
        </button>
        <button
          className={`tab-link ${activeDay === "Day3" ? "active" : ""}`}
          onClick={() => handleTabClick("Day3")}
        >
          Day 3
        </button>
      </div>
      {
        !loading?(
      <Timeline events={eventsData} day={activeDay}/>):
      (
        <div className="event-loader" style={{marginTop:"25vh"}}>

        <div className="loading">
          <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
          <p>Loading Events...</p>
        </div>
        </div>
      )
      }
    </>
  )
}

export default Events