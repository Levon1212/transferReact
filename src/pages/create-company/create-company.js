import React, {useState} from 'react';
import axios from "axios";

const CreateCompany = () => {
    const [name,setName] = useState('')
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [address,setAddress] = useState('')
    const saveCompany = (e) => {
        e.preventDefault()
        const fd = new FormData
        fd.append('name',name)
        fd.append('address',address)
        fd.append('login',login)
        fd.append('password',password)
        fd.append('balance','0')
        axios.post(`${process.env.REACT_APP_BASE_API}create-company`,fd)
            .then(res => {
               if(res.data.message === 'created'){
                   alert('Company created !')
                   window.location.href = '/list-company'
               }
            })
    }
    return (
        <div className='main-page'>
            <form className="createCompany form" onSubmit={saveCompany}>
                <input type="text" value={name} placeholder='Company Name' onChange={e => setName(e.target.value)}/>
                <input type="text" value={address} placeholder='Address' onChange={e => setAddress(e.target.value)}/>
                <input type="text" value={login} placeholder='Login' onChange={e => setLogin(e.target.value)}/>
                <input type="text" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <button className="saveButton">Save Company</button>
            </form>
        </div>
    );
};

export default CreateCompany;