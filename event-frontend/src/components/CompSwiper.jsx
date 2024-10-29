import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';
import '../static/Competitions.css'

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const CompSwiper = ({ competitions }) => {
  console.log(competitions)
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        loop={false}
        spaceBetween={50}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="swiper"
      >
        {competitions && competitions.length > 0 ? 
          competitions.map((comp, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <article className="card">
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
                  <button className="card__button">Read more</button>
                </div>
              </article>

            </SwiperSlide>
          )): 
            <p>No competitions available.</p>
        }

      </Swiper>
    </>
  );
}

export default CompSwiper

{/* <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide> */}
