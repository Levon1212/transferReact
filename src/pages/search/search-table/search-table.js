import React, {useEffect, useState} from 'react';
import axios from "axios";
import {format} from "date-fns";
import SearchTableItem from "../search-table-item";

const SearchTable = (props) => {
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        setOrders(props.data)
    },[props.data])

    return (
        <section className='m-auto'>
            <table className='orders-table'>
                <thead>
                <tr>
                    <th>Id</th>
                    {localStorage.getItem('user') === 'admin' ? <th>Company</th> : ''}
                    <th>Date</th>
                    <th>Service</th>
                    <th>Flight Number</th>
                    <th>Description</th>
                    <th>Guest Count</th>
                    <th>Guest Name</th>
                    <th>Car Category</th>
                    <th>Guide</th>
                    <th>Carseat</th>
                    <th>Order Amount</th>
                    <th>Status</th>
                    {localStorage.getItem('user') === 'admin' ? <th>Change status</th> : ''}
                    <th>Cancel</th>
                    {localStorage.getItem('user') === 'admin' ? <th>Update note</th> : ''}
                </tr>
                </thead>
                <tbody>
                {orders.map((e)=>{return(
                   <SearchTableItem data={e}/>
                )})}
                </tbody>
            </table>
        </section>
    );
};

export default SearchTable;