import React from 'react'
import HoneycombGallery from '../components/HoneycombGallery'
import '../static/Gallery.css'
import { useState, useEffect } from 'react'


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
        <HoneycombGallery gallery={gallery}/>
    </>
  )
}

export default Gallery