import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, NavLink } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';
import '../static/Competitions.css'

// import required modules
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';

const CompSwiper = ({ competitions }) => {
  console.log(competitions)
  return (
    <>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="swiper"
      >
        {competitions && competitions.length > 0 ?
          competitions.map((comp, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <article className="card-comp">
                <img
                  className="card__background"
                  src={comp.poster}
                  alt=""
                  width={1920}
                  height={2193}
                />
                <div className="card__content | flow">
                  <div className="card__content--container | flow">
                    <h2 className="card__title">{comp.name}</h2>
                    <p className="card__description">
                      {comp.prizeMoney}
                    </p>
                  </div>
                  <Link to={`/register/${index}`}>
                    <button className="card__button">Register</button>
                  </Link>

                </div>
              </article>

            </SwiperSlide>
          )) :
          <div className="loading"></div>
        }

      </Swiper>
    </>
  );
}

export default CompSwiper