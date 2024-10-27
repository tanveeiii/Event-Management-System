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

const CompSwiper = ( { competitions } ) => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={4}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        // autoplay={{delay:3000,}}
        // loop='true'
        pagination={false}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="swiper"
      >
        {
          competitions.map( (comp , index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <img src={comp} />
            </SwiperSlide>
          ) )
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
