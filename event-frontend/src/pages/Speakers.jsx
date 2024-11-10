import React, { useState , useEffect } from 'react'
import Speaker from '../components/Speaker'
import "../static/Speakers.css"

const Speakers = () => {

  // const speakers = [{id:"1" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"ilfbidndshjgb"} , 
  //                   {id:"2" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {id:"3" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
  //                   {id:"4" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"ilfbidndshjgb"} , 
  //                   {id:"5" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {id:"6" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
  //                   {id:"7" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"ilfbidndshjgb"} , 
  //                   {id:"8" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {id:"9" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
  // ];
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
        speakers.map((spkr)=>(
          <Speaker key={spkr.id} image={spkr.image} name={spkr.name} title={spkr.title} description={spkr.description}/>
        ))
      }
      </div>
    </>
  )
}

export default Speakers