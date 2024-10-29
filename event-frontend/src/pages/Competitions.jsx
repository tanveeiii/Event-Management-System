import React from 'react'
import Navbar from '../components/Navbar'
import CompSwiper from '../components/CompSwiper'
import { useState , useEffect } from 'react'

const Competitions = () => {
  const compListURL = 'http://localhost:8000/api/competitions/'
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(compListURL);
        console.log(response)
        const compData = await response.json();
        console.log(compData);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);
  const comps = ["https://swiperjs.com/demos/images/nature-1.jpg" , "https://swiperjs.com/demos/images/nature-2.jpg" , "https://swiperjs.com/demos/images/nature-3.jpg"  ]


  return (
    <>
        <h1 className="competitions-title">Competitions</h1>
        <CompSwiper competitions={comps}/>
    </>
  )
}

export default Competitions