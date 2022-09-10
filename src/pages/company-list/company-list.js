import React, {useEffect, useState} from 'react';
import axios from "axios";
import CompanyListItem from "./compani-list-item";

const CompanyList = () => {
    const [companies,setCompanies] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}get-companies`)
            .then(res => setCompanies(res.data))
    },[])
    const updateBalance = () => {

    }
    return (
        <section className='flex-column m-auto'>
            <h1>Companies</h1>
            <table className={'orders-table'}>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Address</th>
                    <th>BALANCE</th>
                    <th>LOGIN</th>
                    <th>PASSWORD</th>
                    <th>UPDATE PRICE</th>
                </tr>
                {
                    companies.map(e => {
                        return (
                            <CompanyListItem data={e}/>
                        )
                    })
                }
            </table>
        </section>
    );
};

export default CompanyList;