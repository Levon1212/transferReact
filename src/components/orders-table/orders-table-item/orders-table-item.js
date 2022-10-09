import React, {useEffect, useState} from 'react';
import {format} from "date-fns";
import axios from "axios";

const OrdersTableItem = (props) => {
    const [companyName,setCompanyName] = useState('')
    const handleCarCategory = (c)=>{
        if(c == 1){
            return '1 - 3 Seats';
        }else if(c == 2){
            return  '4 - 6 Seats'
        }else{
            return '7 - 16 Seats'
        }
    }
    const handleGuestsCount = (e)=>{
        if(e.children !== 'undefined' && e.adults !== 'undefined'){
            return Number(e.adults) + Number(e.children)
        }else if(e.adults !== 'undefined' && e.children === 'undefined'){
            return Number(e.adults)
        }else if(e.adults === 'undefined' && e.children === 'undefined'){
            return ''
        } else {
            return Number(e.children)
        }
    }
    const e = props.data
    useEffect(()=>{
        const fd = new FormData
        fd.append('user_id',e.company_id)
        axios.post(`${process.env.REACT_APP_BASE_API}get-single-user`,fd)
            .then(res => {
                setCompanyName(res.data.name)
            })
    },[props.data])
    return (
        <tr>
            <td>{e.id}</td>
            {localStorage.getItem('user') === 'admin' ?
                <td>{companyName}</td>
                : ''}
            <td>
                {
                    format(new Date(e.date), 'yyyy/MM/dd kk:mm')
                }
            </td>
            <td>
                <div className="serviceIconsWrapper">
                    {
                        e.service === 'up' ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M.2528 166.9L.0426 67.99C.0208 57.74 9.508 50.11 19.51 52.34L55.07 60.24C65.63 62.58 74.29 70.11 78.09 80.24L95.1 127.1L223.3 165.6L181.8 20.4C178.9 10.18 186.6 .001 197.2 .001H237.3C248.8 .001 259.5 6.236 265.2 16.31L374.2 210.2L481.5 241.8C497.4 246.5 512.2 254.3 525.2 264.7L559.6 292.2C583.7 311.4 577.7 349.5 548.9 360.5C507.7 376.1 462.7 378.5 420.1 367.4L121.7 289.8C110.6 286.9 100.5 281.1 92.4 272.9L9.536 189.4C3.606 183.4 .2707 175.3 .2528 166.9V166.9zM608 448C625.7 448 640 462.3 640 480C640 497.7 625.7 512 608 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448H608zM192 368C192 385.7 177.7 400 160 400C142.3 400 128 385.7 128 368C128 350.3 142.3 336 160 336C177.7 336 192 350.3 192 368zM224 384C224 366.3 238.3 352 256 352C273.7 352 288 366.3 288 384C288 401.7 273.7 416 256 416C238.3 416 224 401.7 224 384z"/></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M484.6 62C502.6 52.8 522.6 48 542.8 48H600.2C627.2 48 645.9 74.95 636.4 100.2C618.2 148.9 582.1 188.9 535.6 212.2L262.8 348.6C258.3 350.8 253.4 352 248.4 352H110.7C101.4 352 92.5 347.9 86.42 340.8L13.34 255.6C6.562 247.7 9.019 235.5 18.33 230.8L50.49 214.8C59.05 210.5 69.06 210.2 77.8 214.1L135.1 239.1L234.6 189.7L87.64 95.2C77.21 88.49 78.05 72.98 89.14 67.43L135 44.48C150.1 36.52 169.5 35.55 186.1 41.8L381 114.9L484.6 62zM0 480C0 462.3 14.33 448 32 448H608C625.7 448 640 462.3 640 480C640 497.7 625.7 512 608 512H32C14.33 512 0 497.7 0 480z"/></svg>

                    }
                </div>
            </td>
            <td>
                {e.flight_number}
            </td>
            <td>{e.notes}</td>
            <td>
                {handleGuestsCount(e)}
            </td>
            <td>{e.guest_name}</td>
            <td>{handleCarCategory(e.car_category)}</td>
            <td>{e.guide == '1' ? 'Yes' : 'no'}</td>
            <td>{e.carseat == '1' ? 'Yes' : 'no'}</td>
            <td>{e.order_amount}</td>
            <td className='text-center'>
                <p className={`m-auto 
                                ${e.status === 'accepted' ? 'accepted' : ''} 
                                ${e.status === 'canceled' ? 'canceled' : ''} 
                                ${e.status === 'completed' ? 'completed' : ''}`}>{e.status}</p>
            </td>
        </tr>
    );
};

export default OrdersTableItem;