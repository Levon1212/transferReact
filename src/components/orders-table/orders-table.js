import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import OrdersTableItem from "./orders-table-item";

const OrdersTable = ({list}) => {
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
      setOrders(list)
    },[list])

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
                    </tr>
                </thead>
                <tbody>
                    {orders.map((e)=>{return(
                       <OrdersTableItem data={e}/>
                    )})}
                </tbody>
            </table>
     </section>
    );
};

export default OrdersTable;