import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";
import axios from "axios";
const Header = () => {
    const [user,setUser] = useState({balance:0})
    useEffect(()=>{
        const fd = new FormData
        fd.append('user_id',localStorage.getItem('user'))
        axios.post(`${process.env.REACT_APP_BASE_API}get-user`,fd)
            .then((res)=>{
                setUser(res.data)
            })
    },[])
    const logout = () => {
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return (
        <header className='position-relative'>
            <a href="/"><img src={logo} alt="velvet travel logo" className='logo'/></a>
            <nav >
                <Link to="/search">Appointments</Link>
                {localStorage.getItem('user') === 'admin' ? <Link to="/create-company">Create Company</Link> : ''}
                {localStorage.getItem('user') === 'admin' ? <Link to="/list-company">Companies</Link> : ''}
                {localStorage.getItem('user') !== 'admin' ? <Link to="/create-appointments">Create an Appointments</Link> : ''}

            </nav>
            {localStorage.getItem('user') !== 'admin' ? <span className='bold p-2 bg-light ' style={{position:'absolute',right:'200px'}}>Balance - {user.balance}</span> : ''}
            <span style={{position:'absolute',right:'100px',cursor:'pointer'}} onClick={logout}>logout</span>
        </header>
    );
};

export default Header;