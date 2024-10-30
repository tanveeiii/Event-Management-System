import React, { useState, useEffect } from 'react';
import '../static/Competitions.css'
import CompSwiper from '../components/CompSwiper';

import FadeLoader from 'react-spinners/FadeLoader'

const Competitions = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const compListURL = 'https://run.mocky.io/v3/2a6fbd11-ed93-4cb8-b8d8-883b5a041d74';
  const [compData, setCompData] = useState([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(compListURL);
      const data = await response.json();
      setCompData(data['competitions']);
      console.log(data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  return (
    <>
      {/* <h1 className="competitions-title">Competitions</h1> */}
      {compData.length > 0 ? (
        <CompSwiper competitions={compData} />
      ) : (
        <div className="loading">
          <FadeLoader color='#f76c6c' radius={6} height={20} width={5}/>
          <p>Loading Competitions...</p>
        </div>
      )}
    </>
  );
}

export default Competitions;
