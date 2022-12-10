import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const SearchFilter = (props) => {
    const [orders,setOrders] = useState([]);
    let [startDate,setStartDate] = useState(new Date());
    let [endDate,setEndDate] = useState(new Date());
    const [category, setCategory] = useState('all');
    const [filterId, setFilterId] = useState('');
    const [filterFlight, setFilterFlight] = useState('');
    const [filterGuest, setFilterGuest] = useState('');
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const filterData = ()=>{
        const fd = new FormData
        fd.append('start_date',new Date(startDate).getTime().toString())
        fd.append('end_date',new Date(endDate).getTime().toString())
        fd.append('status',category)
        fd.append('com_id',localStorage.getItem('user'))
        if(filterId.length > 0){
            fd.append('filterId',filterId)
        }
        if(filterFlight.length > 0){
            fd.append('filterFlight',filterFlight)
        }
        if(filterGuest.length > 0){
            fd.append('filterGuest',filterGuest)
        }
        axios.post(`${process.env.REACT_APP_BASE_API}search-filter`,fd)
            .then(res => {
                setOrders(res.data);
            })
    }
    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}get-appointment-all?com-id=${localStorage.getItem('user')}`)
            .then(res=> {
                setOrders(res.data)
            })
    },[])
    useEffect(()=>{
        props.sertOrders(orders)
    },[orders])

    return (
        <div className="d-flex flex-column w-100 align-items-center mt-5 upcoming-filter p-2 form">
            <div className="top-part d-flex align-items-center">
                <span className='white-space me-3 fw-bold'>Start date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                    }}/>
                <span className='white-space mx-3 fw-bold'>End date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date)
                    }}/>
                <Box sx={{ minWidth: 120,marginLeft:'15px'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={handleCategory}>
                            <MenuItem value='all'>All</MenuItem>
                            <MenuItem value='accepted'>Accepted</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                            <MenuItem value='canceled'>Canceled</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='exportButton' onClick={(e) => exportToCSV(orders, 'appointments')}>Export</div>
            </div>
            <div className="second-part w-100 d-flex flex-row mt-2">
                <input type="text" placeholder='Id' className='me-4' value={filterId} onChange={(e)=> {
                    setFilterId(e.target.value)
                }}/>
                <input type="text" placeholder='Flight Number' className='me-4' value={filterFlight} onChange={(e)=> {
                    setFilterFlight(e.target.value)
                }}/>
                <input type="text" placeholder='Guest Name' value={filterGuest} onChange={(e)=> {
                    setFilterGuest(e.target.value)
                }}/>
            </div>
            <div className="second-part w-100 d-flex flex-row mt-2">
                <div className="saveButton" onClick={filterData}>search</div>
            </div>
        </div>
    );
};

export default SearchFilter;