import React from 'react'
import HoneycombGallery from '../components/HoneycombGallery'
import '../static/Gallery.css'
import { useState, useEffect } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'


const Gallery = () => {
  const [gallery, setGalleryData] = useState([])

const galleryListURL = 'http://localhost:8000/api/gallery/'
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
          <div className="loading">
            <FadeLoader color='#f76c6c' radius={6} height={20} width={5} />
            <p>Loading Images...</p>
          </div>
          )
      }
    </>
  )
}

export default Gallery