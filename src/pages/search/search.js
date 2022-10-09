import React, {useEffect, useState} from 'react';
import SearchTable from "./search-table";
import SearchFilter from "./search-filter";
const Search = () => {

    const [orders,setOrders] = useState([]);



    return (
        <div className='transfer-list'>
            <SearchFilter sertOrders={setOrders}/>
            <SearchTable data={orders} />
        </div>
    );
};

export default Search;