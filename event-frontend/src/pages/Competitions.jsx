import React from 'react'
import Navbar from '../components/Navbar'
import CompSwiper from '../components/CompSwiper'
import { useState , useEffect } from 'react'

const Competitions = () => {
  //LINK WITH BACKEND
  /* const [comps , setcomps] = useState([]);

  useEffect( () => {

    const fetchdata = async () => {
      const apiurl = ""
      try {
        const res = await fetch(apiurl);
        const data = await res.json();
        setcomps(data);
      } catch (error) {
        console.log("Error fetching data" , error);
      }
    }

    fetchdata();

  } , []); */

  //TEMPORARY PLACEHOLDER
  const comps = ["https://swiperjs.com/demos/images/nature-1.jpg" , "https://swiperjs.com/demos/images/nature-2.jpg" , "https://swiperjs.com/demos/images/nature-3.jpg" , "https://swiperjs.com/demos/images/nature-4.jpg" , "https://swiperjs.com/demos/images/nature-5.jpg" , "https://swiperjs.com/demos/images/nature-6.jpg" , "https://swiperjs.com/demos/images/nature-7.jpg" , "https://swiperjs.com/demos/images/nature-8.jpg"]


  return (
    <>
        <h1 className="competitions-title">Competitions</h1>
        <CompSwiper competitions={comps}/>
    </>
  )
}

export default Competitions