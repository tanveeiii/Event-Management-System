import React from 'react'
import '../static/Gallery.css'

const HoneycombGallery = ({ gallery }) => {
    console.log(gallery)
    return (
        <ul className="hex-grid__list">
            {
                gallery && gallery.length > 0 ?
                    gallery.map((images,index)=>(
                    <li key={index} className="hex-grid__item">
                        <div className="hex-grid__content"><img src={images.image} alt="" /></div>
                    </li>)):<div className='loading'></div>
            }
            {/* <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li>
            <li className="hex-grid__item">
                <div className="hex-grid__content">2</div>
            </li> */}
        </ul>
    )
}

export default HoneycombGallery