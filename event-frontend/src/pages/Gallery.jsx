import React from 'react'
import HoneycombGallery from '../components/HoneycombGallery'
import '../static/Gallery.css'
import { useState, useEffect } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { useAuth } from '../context/AuthContext'

const Gallery = () => {
  const [gallery, setGalleryData] = useState([])
  const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()
  useEffect(() => {
    const storedInfo = JSON.parse(sessionStorage.getItem("user"))
    if(storedInfo && storedInfo.loggedIn){
      setLoggedIn(true)
      setTeamName(storedInfo.teamName)
    }
  }, [])



const galleryListURL = 'http://127.0.0.1:8000/api/gallery/'
  useEffect(() => {
    fetchGallery();
  }, []);
  const fetchGallery = async () => {
    try {
      const response = await fetch(galleryListURL);
      const data = await response.json();
      setGalleryData(data)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  return (
    <>
        {
        gallery.length>0?
        <HoneycombGallery gallery={gallery}/>:
        (
          <div className="gallery-loader" style={{marginTop:"45vh"}}>

          <div className="loading">
            <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
            <p>Loading Images...</p>
          </div>
          </div>
          )
      }
    </>
  )
}

export default Gallery