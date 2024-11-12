import React from 'react'
import HoneycombGallery from '../components/HoneycombGallery'
import '../static/Gallery.css'
import { useState, useEffect } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'


const Gallery = () => {
  const [gallery, setGalleryData] = useState([])

const galleryListURL = 'https://run.mocky.io/v3/4a6fb8af-4dbd-4e18-832b-bcb413050438'
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