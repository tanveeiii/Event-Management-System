import React, { useState , useEffect } from 'react'
import Speaker from '../components/Speaker'
import "../static/Speakers.css"
import FadeLoader from 'react-spinners/FadeLoader'

const Speakers = () => {

  const [speakers , setspeakers] = useState([]);
 
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
    useEffect(() => {
      fetchspeakers()
    }, [speakers])
    
     

  return (
    <>
      <h1 className="speakers-title">Speakers</h1>
      {speakers.length>0 ?
        
      <div className='speakers-container'>
      {
        speakers.map((spkr , index)=>(
          <Speaker key={index} image={spkr.image} name={spkr.name}  description={spkr.desc}/>
        ))
      }
      </div>:
      ( 
        <div className="speakers-loader">
          <div className="loading">
            <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
            <p>Loading Speakers...</p>
          </div>
        </div>
        )
      }
    </>
  )
}

export default Speakers