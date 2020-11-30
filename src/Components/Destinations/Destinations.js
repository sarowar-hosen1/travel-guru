import React, { useContext } from 'react';
import { UserContext } from '../../App';
import hotelInfo from '../../fakeData/hotelInfo.json';
import HotelDetails from '../HotelDetails/HotelDetails';
import Maps from '../Maps/Maps';


const Destinations = () => {
    const [area, setArea] = useContext(UserContext)
    return (
        <div className='container destination'>
            <div className="row">
                <div className="col-md-6">
                    <h3>Stay in {area}</h3>
                    {
                        hotelInfo.map(hotel => <HotelDetails hotel={hotel}></HotelDetails>)
                    }
                </div>
                <div className="col-md-6">
                    <Maps></Maps>
                </div>
            </div>
        </div>
    );
};

export default Destinations;