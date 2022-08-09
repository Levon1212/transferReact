import React from 'react';
import OrdersTable from "../../components/orders-table";

const TransferList = () => {
    return (
        <div className='transfer-list'>
            <h1>Upcoming Appointments</h1>
            <OrdersTable/>
        </div>
    );
};

export default TransferList;