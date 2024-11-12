import React from 'react'
import '../static/Partners.css'
import FadeLoader from 'react-spinners/FadeLoader'
import { useState, useEffect } from 'react'
import SponsorCard from '../components/SponsorCard'

const Partners = () => {
const [sponsors, setSponsorsData] = useState([])

const sponsorListURL = 'http://localhost:8000/api/sponsors/'
  useEffect(() => {
    fetchSponsors();
  }, []);
  const fetchSponsors = async () => {
    try {
      const response = await fetch(sponsorListURL);
      const data = await response.json();
      setSponsorsData(data)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  return (
    <>
    {
      sponsors.length>0?
      <SponsorCard sponsors={sponsors}/>:
      (
        <div className="partners-loader" style={{marginTop : "45vh",}}>

        <div className="loading">
          <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
          <p>Loading Partners...</p>
        </div>
        </div>
        )
    }
    </>
  )
}

export default Partners