import "../static/Events.css";
import Timeline from '../components/Timeline';
import React, { useState , useEffect } from "react";

const Events = () => {

  const [activeDay, setActiveDay] = useState("Day1");

  const handleTabClick = (day) => {
    setActiveDay(day);
  };

  const events = ["Event1" , "Event2" , "Event3" ,"Event4"]

  /* const [events , setevents] = useState([]);
  
  useEffect( () => {
    const fetchevents = async () => {
      var apiurl = "";
      apiurl = activeDay == "Day1" && "";
      apiurl = activeDay == "Day2" && "";
      apiurl = activeDay == "Day3" && "";
      apiurl = activeDay == "Day4" && "";
      try {
        const res = await fetch(apiurl);
        const data = await res.json();
        setevents(data);
      } catch (error) {
        console.log("Error fetching data");
      }
    }

    fetchevents();
  } , []); */

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

      <Timeline events={events}/>
    </>
  )
}

export default Events