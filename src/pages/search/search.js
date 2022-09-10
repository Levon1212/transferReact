import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchTable from "./search-table";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
const Search = () => {
    let [startDate,setStartDate] = useState(new Date());
    let [endDate,setEndDate] = useState(new Date());
    const [category, setCategory] = useState('accepted');
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_API}get-appointment-all?com-id=${localStorage.getItem('user')}`)
            .then(res=> {
                setOrders(res.data)
                console.log('wwww',res.data);
            })
    },[])
    const filterData = ()=>{
        const fd = new FormData
        fd.append('start_date',startDate)
        fd.append('end_date',endDate)
        fd.append('status',category)
        fd.append('com_id',localStorage.getItem('user'))
        axios.post(`${process.env.REACT_APP_BASE_API}search-filter`,fd)
            .then(res => {
                setOrders(res.data);

            })
    }
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    return (
        <div className='transfer-list'>
            <div className="d-flex w-100 align-items-center mt-5 ">
                <h1 className='white-space m-0'>Upcoming Appointments</h1>
                <span className='white-space mx-3 fw-bold'>Start date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}/>
                <span className='white-space mx-3 fw-bold'>End date</span>
                <DatePicker
                    dateFormat="y-MM-dd HH:mm"
                    showTimeInput
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}/>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={handleCategory}>
                            <MenuItem value='accepted'>Accepted</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                            <MenuItem value='canceled'>Canceled</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='exportButton' onClick={(e) => exportToCSV(orders, 'appointments')}>Export</div>
                <div className="button saveButton ms-2 me-2" onClick={filterData}>search</div>
            </div>
            <SearchTable data={orders}/>
        </div>
    );
};

export default Search;