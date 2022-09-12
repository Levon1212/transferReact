import React, {useEffect, useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from "axios";

const CreateAppointments = () => {
    const [type, setType] = useState('up');
    const [flightNumber, setFlightNumber] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [adults, setAdults] = useState();
    const [children, setChildren] = useState();
    const [email, setEmail] = useState('');
    const [guide, setGuide] = useState(false);
    const [carseat, setCarseat] = useState(false);
    const [category, setCategory] = useState(1);
    const [price,setPrice] = useState(6000);
    useEffect(()=>{
        if(category === 1){
            setPrice(6000)
        }else if(category === 2){
            setPrice(10000)
        }else {
            setPrice(20000)
        }
    },[category])
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleChange = (event) => {
        setType(event.target.value);
    }
    const handleSubmit = () => {
        const fd = new FormData;
        fd.append('date',startDate.getTime().toString());
        fd.append('service',type);
        fd.append('notes',notes);
        fd.append('guest_name',guestName);
        fd.append('car_category',category.toString());
        fd.append('guide',guide ? '1' : '0');
        fd.append('carseat',carseat ? '1' : '0');
        fd.append('order_amount',price.toString());
        fd.append('status','accepted');
        fd.append('company_id',localStorage.getItem('user'));
        fd.append('flight_number',flightNumber);
        fd.append('adults',adults);
        fd.append('children',children);
        fd.append('guest_email',email);
        fd.append('contact_number',guestPhone);
        axios.post(`${process.env.REACT_APP_BASE_API}add-appointment`,fd)
            .then(res=>{
                if(res.data.message === 'created'){
                    window.location.href = '/';
                }
            })
    }
    return (
        <section className={'create-appointments form'}>
            <h2 className='pageTitle'>Create an appointments</h2>
            <div className="formRow mt-3">
                <div className='d-flex w-50 pe-3'>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={handleChange}>
                            <FormControlLabel value="up" control={<Radio />} label={(
                                <div className='d-flex radio-label-wrapper'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M.2528 166.9L.0426 67.99C.0208 57.74 9.508 50.11 19.51 52.34L55.07 60.24C65.63 62.58 74.29 70.11 78.09 80.24L95.1 127.1L223.3 165.6L181.8 20.4C178.9 10.18 186.6 .001 197.2 .001H237.3C248.8 .001 259.5 6.236 265.2 16.31L374.2 210.2L481.5 241.8C497.4 246.5 512.2 254.3 525.2 264.7L559.6 292.2C583.7 311.4 577.7 349.5 548.9 360.5C507.7 376.1 462.7 378.5 420.1 367.4L121.7 289.8C110.6 286.9 100.5 281.1 92.4 272.9L9.536 189.4C3.606 183.4 .2707 175.3 .2528 166.9V166.9zM608 448C625.7 448 640 462.3 640 480C640 497.7 625.7 512 608 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448H608zM192 368C192 385.7 177.7 400 160 400C142.3 400 128 385.7 128 368C128 350.3 142.3 336 160 336C177.7 336 192 350.3 192 368zM224 384C224 366.3 238.3 352 256 352C273.7 352 288 366.3 288 384C288 401.7 273.7 416 256 416C238.3 416 224 401.7 224 384z"/></svg>
                                    <span>Pick Up</span>
                                </div>
                            )
                            } />
                            <FormControlLabel value="off" control={<Radio />} label={(
                                <div className='d-flex radio-label-wrapper'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M484.6 62C502.6 52.8 522.6 48 542.8 48H600.2C627.2 48 645.9 74.95 636.4 100.2C618.2 148.9 582.1 188.9 535.6 212.2L262.8 348.6C258.3 350.8 253.4 352 248.4 352H110.7C101.4 352 92.5 347.9 86.42 340.8L13.34 255.6C6.562 247.7 9.019 235.5 18.33 230.8L50.49 214.8C59.05 210.5 69.06 210.2 77.8 214.1L135.1 239.1L234.6 189.7L87.64 95.2C77.21 88.49 78.05 72.98 89.14 67.43L135 44.48C150.1 36.52 169.5 35.55 186.1 41.8L381 114.9L484.6 62zM0 480C0 462.3 14.33 448 32 448H608C625.7 448 640 462.3 640 480C640 497.7 625.7 512 608 512H32C14.33 512 0 497.7 0 480z"/></svg>
                                    <span>Drop Off</span>
                                </div>
                            )} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='d-flex justify-content-end w-50 ps-3'>
                    <div className="price">{price}</div>
                </div>
            </div>
            <div className="formRow mt-2">
                <div className='d-flex w-50 pe-3'>
                    <DatePicker
                        dateFormat="y-MM-dd HH:mm"
                        showTimeInput
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}/>

                </div>
                <div className='d-flex w-50 ps-3'>
                    <input type="text"
                           placeholder='Flight Number'
                           value={flightNumber}
                           onChange={e=>setFlightNumber(e.target.value)}/>
                </div>
            </div>
            <div className="formRow mt-2">
                <div className='d-flex w-50 pe-3'>
                    <input type="text"
                           value={guestName}
                           onChange={e=>setGuestName(e.target.value)}
                           placeholder='Guest Name'/>
                </div>
                <div className='d-flex w-50 ps-3'>
                    <input type="phone"
                           value={guestPhone}
                           onChange={e=>setGuestPhone(e.target.value)}
                           placeholder='Contact Number'/>
                </div>
            </div>
            <div className="formRow mt-2">
                <div className='d-flex w-50 pe-3'>
                    <input type="text"
                           value={notes}
                           onChange={e=>setNotes(e.target.value)}
                           placeholder='Notes'/>
                </div>
                <div className='d-flex w-50 ps-3'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Car</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Age"
                                onChange={handleCategory}
                            >
                                <MenuItem value={1}>1 - 3 Seats</MenuItem>
                                <MenuItem value={2}>4 - 6 Seats</MenuItem>
                                <MenuItem value={3}>7 - 16 Seats</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className="formRow mt-2">
                <div className='d-flex w-50 pe-3'>
                    <input type="number"
                           value={adults}
                           onChange={e=>setAdults(e.target.value)}
                           placeholder='Adults'/>
                </div>
                <div className='d-flex w-50 ps-3'>
                    <input type="number"
                           placeholder='Children (up to 3 year)'
                           value={children}
                           onChange={e=>setChildren(e.target.value)}/>
                </div>
            </div>
            <div className="formRow mt-2">
                <div className='d-flex w-50 pe-3'>
                    <input type="text"
                           value={email}
                           onChange={e=>setEmail(e.target.value)}
                           placeholder='Email'/>
                </div>
                <div className='d-flex w-50 ps-3'>
                    <FormControlLabel control={<Switch checked={guide} onChange={e=>setGuide(e.target.checked)}/>} label="Guide" />
                    <FormControlLabel control={<Switch checked={carseat} onChange={e=>setCarseat(e.target.checked)}/>} label="Car seat" />
                </div>
            </div>
            <div className="formRow mt-2">
                <button className="saveButton" onClick={handleSubmit}>Send</button>
            </div>
        </section>
    );
};

export default CreateAppointments;