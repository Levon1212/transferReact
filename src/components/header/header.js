import React from 'react';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <header>
            <a href="/"><img src={logo} alt="velvet travel logo" className='logo'/></a>
            <nav>
                <Link to="/search">Appointments</Link>
                <Link to="/create-company">Create Company</Link>
                <Link to="/list-company">Companies</Link>
                <Link to="/create-appointments">Create an Appointments</Link>
            </nav>
        </header>
    );
};

export default Header;