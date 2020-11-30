import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import locations from '../../fakeData/location.json';
import Navbar from '../Navbar/Navbar';
import './Booking.css';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';

const Booking = () => {
    const { id } = useParams()
    const activeItem = locations.find(location => location.id == id);
    const history = useHistory();

    const [area, setArea] = useContext(UserContext);

    const startBookinHandle = () => {
        const destination = document.getElementById('destination');
        setArea(destination.value)
        history.push('/destination')
    }

    //Material ui date picker
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-11-27T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    

    return (
        <div className='booking-details'>
            <div className="container booking-container">
                <div className="row d-flex justify-content-center align-items-center">

                    <div className='col-md-7 booking-details-content'>
                        <h1 className='text-white'>{activeItem.name}</h1>
                        <p className='text-white'>{activeItem.desc}</p>
                    </div>

                    <div className="col-md-5">
                        
                        <div className="booking-field">
                            <form className='form-group'>
                                <label className='text-muted'>Origin</label>
                                <input type="text" className='form-control mb-3' placeholder='Origin' />
                                <label className='text-muted'>Destination</label>
                                <input id='destination' type="text" className='form-control' placeholder='Destination' />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid className='d-flex justify-content-between'>
                                    <KeyboardDatePicker
                                        className='mr-4'
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="From"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="To"
                                        id="date-picker-inline"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <input onClick={startBookinHandle} type="submit" value='Start Booking' className='booking-btn btn w-100 mt-4' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;