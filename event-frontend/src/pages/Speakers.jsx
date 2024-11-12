import React, { useState , useEffect } from 'react'
import Speaker from '../components/Speaker'
import "../static/Speakers.css"

const Speakers = () => {

  const [speakers , setspeakers] = useState([]);
  
  useEffect( () => {
    const fetchspeakers = async () => {
      const apiurl = "http://localhost:8000/api/speaker/";
      try {
        const res = await fetch(apiurl);
        const data = await res.json();
        setspeakers(data);
      } catch (error) {
        console.log("Error fetching data");
      }
    }

    fetchspeakers();
  } , []); 

  return (
    <>
      <h1 className="speakers-title">Speakers</h1>
      <div className='speakers-container'>
      {
        speakers.map((spkr , index)=>(
          <Speaker key={index} image={spkr.image} name={spkr.name}  description={spkr.desc}/>
        ))
      }
      </div>
      {/* <Speaker /> */}
    </>
  )
}

export default Speakers