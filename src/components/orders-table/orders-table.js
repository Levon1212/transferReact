import React, {useEffect, useState} from 'react';
import axios from 'axios';
const OrdersTable = () => {
    const [orders,setOrders] = useState([
        {id:1,},
    ]);

    return (
        <section>
            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Service</th>
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
                        <tr><td>{e.id}</td></tr>
                    )})}
                </tbody>
            </table>
     </section>
    );
};

export default OrdersTable;