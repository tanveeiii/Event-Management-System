import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CompSwiper from '../components/CompSwiper';

const Competitions = () => {
  const compListURL = 'http://localhost:8000/api/competitions/';
  const comps1 = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
    "https://swiperjs.com/demos/images/nature-6.jpg",
    "https://swiperjs.com/demos/images/nature-7.jpg",
    "https://swiperjs.com/demos/images/nature-8.jpg"
  ];
  const arrayLength = comps1.length;

  // Initialize indices x, y, z
  const [x, setX] = useState(0);
  const [y, setY] = useState(1);
  const [z, setZ] = useState(2);

  // Derive the subarray from the indices x, y, z
  const comps = [comps1[x], comps1[y], comps1[z]];

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(compListURL);
        const compData = await response.json();
        console.log(compData);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);

  // Handle forward button (increments indices)
  const handleForward = () => {
    setX((prevX) => (prevX + 1) % arrayLength);
    setY((prevY) => (prevY + 1) % arrayLength);
    setZ((prevZ) => (prevZ + 1) % arrayLength);
  };

  // Handle backward button (decrements indices)
  const handleBackward = () => {
    setX((prevX) => (prevX - 1 + arrayLength) % arrayLength);
    setY((prevY) => (prevY - 1 + arrayLength) % arrayLength);
    setZ((prevZ) => (prevZ - 1 + arrayLength) % arrayLength);
  };

  return (
    <>
      <h1 className="competitions-title">Competitions</h1>
      <CompSwiper competitions={comps} />
      {/* <button onClick={handleBackward}>Previous</button>
      <button onClick={handleForward}>Next</button> */}
    </>
  );
};

export default Competitions;
