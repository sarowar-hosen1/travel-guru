import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SwiperCore, { Navigation, A11y, Autoplay, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import locations from '../../fakeData/location.json';

import './TravelPlaces.css'

SwiperCore.use([Navigation, A11y, Autoplay]);

const TravelPlaces = () => {

    let [slideIndex, setSlideIndex] = useState(0)
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const activeItem = locations.find((loctaion, index) => index.toString() === slideIndex.toString())
        setBooking(activeItem)
    }, [slideIndex])

    let history = useHistory();
    const showBooking = () => {
        history.push(`/booking/${booking.id}`)
    }
    return (
        <div className="container travel-places">
            <div className="row">
                <div className="col-md-4">
                    <h1 className='text-white location-title'>{booking.name}</h1>
                    <p className='text-white location-desc'>{booking.desc ?.slice(0,180)}...</p>
                    <button onClick={showBooking} className='booking-btn btn'>Booking</button>
                </div>

                <div className="col-md-8">
                    <Swiper
                        className='swiper'
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        onSwiper={(swiper) => { console.log(swiper) }}
                        onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                    >
                        {
                            locations.map(data => <SwiperSlide className="swiperSlide">
                                <img src={data.Picture} alt="" />
                                <h3>{data.name}</h3>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TravelPlaces;


