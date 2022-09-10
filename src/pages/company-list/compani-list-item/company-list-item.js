import React, {useEffect, useState} from 'react';
import axios from "axios";

const CompanyListItem = (props) => {
    const [balance,setBalance] = useState(props.data.balance)
    const updateBalance = () => {
        const fd = new FormData
        fd.append('balance',balance)
        fd.append('id',props.data.id)
        axios.post(`${process.env.REACT_APP_BASE_API}update-companies-price`,fd)
            .then(res => {
                if(res.data.message === 'updated'){
                    alert('Balance updated')
                    window.location.reload()
                }
            })
    }
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.address}</td>
            <td>{props.data.balance}</td>
            <td>{props.data.login}</td>
            <td>{props.data.password}</td>
            <td>
                <div className="d-flex">
                    <input type="text"
                           value={balance}
                           onChange={(e)=>{setBalance(e.target.value)}}
                           className='update-input'
                           placeholder='update price'/>
                    <div className='saveButton' onClick={updateBalance}>update</div>
                </div>
            </td>
        </tr>
    );
};

export default CompanyListItem;