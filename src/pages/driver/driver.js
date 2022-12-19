import React, {useEffect, useState} from 'react';
import axios from "axios";

const Driver = () => {
    const [fd,setFd] = useState({
        name:'',
        phone:'',
        car:'',
    })
    const [drivers,setDrivers] = useState([])
    const handleChange = (event)=>{
        setFd({
            ...fd,
            [event.target.name]:event.target.value
        })
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}driver`)
            .then(res=>{
                setDrivers(res.data)
            })
    },[])
    const handleSubmit = ()=>{
        const formData = new FormData
        formData.append('name',fd.name)
        formData.append('phone',fd.phone)
        formData.append('car',fd.car)
        axios.post(`${process.env.REACT_APP_BASE_API}driver`,fd)
            .then(res=> {
                alert('Driver created')
                setDrivers(res.data)
            })
    }
    const deleteDriver = (event)=>{
        axios.delete(`${process.env.REACT_APP_BASE_API}driver/${event.target.name}`)
            .then(res=>{
                setDrivers(res.data)
            })
    }
    return (
        <div className='d-flex flex-column align-items-center '>
            <h1>Drivers</h1>
            <table className='driver-table'>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Car</th>
                    <th></th>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="text"
                               name='name'
                               onChange={handleChange}
                               value={fd.name}
                               placeholder='Name'
                        />
                    </td>
                    <td>
                        <input type="text"
                               name='phone'
                               onChange={handleChange}
                               value={fd.phone}
                               placeholder='Phone number'
                        />
                    </td>
                    <td>
                        <input type="text"
                               name='car'
                               onChange={handleChange}
                               value={fd.car}
                               placeholder='Car'
                        />
                    </td>
                    <td>
                        <button className='button px-5 bg-success text-light py-1' onClick={handleSubmit}>Save</button>
                    </td>
                </tr>
                {
                    drivers.map((e)=>{
                        return (
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.phone}</td>
                                <td>{e.car}</td>
                                <td><button name={e.id}
                                            onClick={deleteDriver}
                                            className='button bg-danger text-light px-5 py-1'>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default Driver;