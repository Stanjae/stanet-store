// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import bgImage from '../../assets/wallpaper-2470x1647-hd-for-mobile.jpg'
import 'swiper/css';
import 'swiper/bundle'
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

export default function Home() {
  return (
    <>
      <Swiper
        /* style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }} */
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage:`url(${bgImage})`,
          }}
      
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Get 10% off every Purchase
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Stanet Stores.INC
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Affordable Shipping and Fast Delivery
          </div>
          <div className="subtitle" data-swiper-parallax="-200"> Stanet Stores.INC
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Get Original Products at Affordable Prices
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Stanet Stores.INC
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
