import React from 'react';
import './HotelDetails.css';
import starIcon from '../../images/Icon/star_1_.png';

const HotelDetails = (props) => {
    const { img, title, reviewed, star, price, bath, bed, bedroom, guest } = props.hotel;
    return (
        <div className='row my-4'>
            <div className="col-md-4">
                <img className='w-100 h-100' src={img} alt="" />
            </div>
            <div className="col-md-8">
                <div className="hotel-details-content">
                    <h5>{title}</h5>
                    <p>{guest}- Geust  {bedroom}- Bedrooms  {bed}- Beds  {bath}- Baths</p>
                    <p>Wif Air Conditioning Kitchen</p>
                    <p>Cenceling flexibilities Available</p>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <img className='review-star' src={starIcon} alt="" />
                            <span>{star}({reviewed})</span>
                        </div>
                        <p><span className='font-weight-bold'>${price}</span>/Night</p>
                        <p className='text-muted'>$170/Total</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;