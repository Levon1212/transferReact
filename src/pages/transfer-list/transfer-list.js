import React, {useEffect, useState} from 'react';
import OrdersTable from "../../components/orders-table";
import axios from "axios";
import DatePicker from "react-datepicker";

const TransferList = () => {
    const [orders,setOrders] = useState([]);
    let [startDate,setStartDate] = useState(new Date());
    let [endDate,setEndDate] = useState(new Date());
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}get-appointment?com-id=${localStorage.getItem('user')}`)
            .then(res=>setOrders(res.data))
    },[])
    const filterData = ()=>{
        const fd = new FormData
        fd.append('start_date',new Date(startDate).getTime().toString())
        fd.append('end_date',new Date(endDate).getTime().toString())
        fd.append('status','accepted')
        fd.append('com_id',localStorage.getItem('user'))
        axios.post(`${process.env.REACT_APP_BASE_API}search-filter`,fd)
            .then(res => {
                setOrders(res.data);
            })
    }
    return (
        <div className='transfer-list'>
            <div className="d-flex white-space align-items-center mt-4 px-3">
                <h1 className='m-0'>Upcoming Appointments</h1>
                <span className='white-space ms-3 me-3 fw-bold w-fit-content'>Start date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                    }}/>
                <span className='white-space mx-3 fw-bold w-fit-content'>End date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date)
                    }}/>
                <div className="saveButton" onClick={filterData}>search</div>
            </div>
            <OrdersTable list={orders}/>
        </div>
    );
};

export default TransferList;