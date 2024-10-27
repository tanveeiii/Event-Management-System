import "../static/Events.css";
import Timeline from '../components/Timeline';
import React, { useState, useEffect } from "react";
import axios from 'axios'

const Events = () => {

  const [activeDay, setActiveDay] = useState("Day1");

  const handleTabClick = (day) => {
    setActiveDay(day);
  };


  const eventListURL = 'http://localhost:8000/api/event/'
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(eventListURL);
        console.log(response)
        const eventsData = await response.json();
        console.log(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);


  const events = ["Event1", "Event2", "Event3", "Event4"]


  return (
    <>
      <h1 className="schedule-title">Schedule</h1>
      <div className="tabs">
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
        <button
          className={`tab-link ${activeDay === "Day4" ? "active" : ""}`}
          onClick={() => handleTabClick("Day4")}
        >
          Day 4
        </button>
      </div>

      <Timeline events={events} />
    </>
  )
}

export default Events