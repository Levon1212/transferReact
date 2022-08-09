import React, {useEffect, useState} from 'react';
import axios from "axios";

const CompanyList = () => {
    const [companies,setCompanies] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}get-companies`)
            .then(res => setCompanies(res.data))
    },[])
    return (
        <section>
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
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.address}</td>
                                <td>{e.balance}</td>
                                <td>{e.login}</td>
                                <td>{e.password}</td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </table>
        </section>
    );
};

export default CompanyList;