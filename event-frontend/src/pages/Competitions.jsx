import React, { useState, useEffect } from 'react';
import EmblaCarousel from '../components/EmblaCarousel';
import '../static/Competitions.css'

const Competitions = () => {
  const compListURL = 'http://localhost:8000/api/competitions/';
  const [compData, setCompData] = useState([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(compListURL);
      const data = await response.json();
      setCompData(data);
      console.log(data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  return (
    <>
      <h1 className="competitions-title">Competitions</h1>
      {compData.length > 0 ? (
        <EmblaCarousel slides={compData} /> 
      ) : (
        <p>Loading competitions...</p>
      )}
    </>
  );
}

export default Competitions;
