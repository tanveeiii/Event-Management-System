import React, { useState, useEffect } from 'react';
import CompSwiper from '../components/CompSwiper';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Competitions = () => {
  const compListURL = 'http://localhost:8000/api/competitions/';
  const [compData, setCompData] = useState([]);
  let comps, arrayLength;
  let handleBackward, handleForward;
  const [x, setX] = useState(0);
  const [y, setY] = useState(1);
  const [z, setZ] = useState(2);
  useEffect(() => {
    fetchCompetitions();
  }, []);
  const fetchCompetitions = async () => {
    try {
      const response = await fetch(compListURL);
      const data = await response.json();
      setCompData(data)
      console.log(compData);
      arrayLength = compData.length;
 
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  comps = compData.length > 0 ? [compData[x], compData[y], compData[z]] : null;

  handleForward = () => {
    setX((prevX) => (prevX + 1) % arrayLength);
    setY((prevY) => (prevY + 1) % arrayLength);
    setZ((prevZ) => (prevZ + 1) % arrayLength);
  };

  handleBackward = () => {
    setX((prevX) => (prevX - 1 + arrayLength) % arrayLength);
    setY((prevY) => (prevY - 1 + arrayLength) % arrayLength);
    setZ((prevZ) => (prevZ - 1 + arrayLength) % arrayLength);
  };
  // const comps1 = [
  //   "https://swiperjs.com/demos/images/nature-1.jpg",
  //   "https://swiperjs.com/demos/images/nature-2.jpg",
  //   "https://swiperjs.com/demos/images/nature-3.jpg",
  //   "https://swiperjs.com/demos/images/nature-4.jpg",
  //   "https://swiperjs.com/demos/images/nature-5.jpg",
  //   "https://swiperjs.com/demos/images/nature-6.jpg",
  //   "https://swiperjs.com/demos/images/nature-7.jpg",
  //   "https://swiperjs.com/demos/images/nature-8.jpg"
  // ];

  return (
    <>
      {/* <h1 className="competitions-title">Competitions</h1> */}
      {/* <CompSwiper competitions={comps} /> */}
      {
      comps ? <CompSwiper competitions={comps} /> : <p>Loading competitions...</p>}
      {/* <button onClick={handleBackward}>Previous</button>
      <button onClick={handleForward}>Next</button> */}
      <div className="navigation">
        <button className="nav-button" onClick={handleBackward}>
          <AiOutlineLeft />
        </button>
        <button className="nav-button" onClick={handleForward}>
          <AiOutlineRight />
        </button>
      </div>

    </>
  );
};

export default Competitions;
