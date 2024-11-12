import React, { useState , useEffect } from 'react'
import Speaker from '../components/Speaker'
import "../static/Speakers.css"

const Speakers = () => {

  // const speakers = [{name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"gtfdsgvbndbuk euerbgbuj srufhgb hberg hvbsjb gjdsfhb jhgbh ujsbg jdufb mdfhs bjdsfhgb jdsfhb j"} , 
  //                   {name:"Manan" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
  //                   {name:"Mani" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"ilfbnamendshjgb"} , 
  //                   {name:"Manan" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {name:"Jeel" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
  //                   {name:"Jeel" , image:"https://swiperjs.com/demos/images/nature-1.jpg" , title:"Entrepreneur" , description:"ilfbnamendshjgb"} , 
  //                   {name:"Jeel" , image:"https://swiperjs.com/demos/images/nature-2.jpg" , title:"Gamer" , description:"gersagh"} , 
  //                   {name:"Jeel" , image:"https://swiperjs.com/demos/images/nature-3.jpg" , title:"Youtube Watcher" , description:"bdhjsbgfsvz"},
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
        speakers.map((spkr , index)=>(
          <Speaker key={index} image={spkr.image} name={spkr.name} title={spkr.title} description={spkr.description}/>
        ))
      }
      </div>
    </>
  )
}

export default Speakers