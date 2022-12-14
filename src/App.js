import React, {useEffect,useState,createContext} from 'react';
import Header from "./components/header";
import TransferList from "./pages/transfer-list";
import CreateCompany from "./pages/create-company";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import CompanyList from "./pages/company-list";
import CreateAppointments from "./pages/create-appointments";
import Login from "./pages/login";
import Search from "./pages/search";
import Test from "./pages/test/test";
import EditAppointments from "./pages/edit-appointments";
import Driver from "./pages/driver";
export const UserContext = createContext(null);
export const UserAuthContext = createContext(null);

const App = () => {
    const [user,setUser] = useState(null)
    const handleAuth = ()=>{
        if(!localStorage.getItem('user') && window.location.pathname !== '/login'){
            window.location.href = '/login'
        }
    }

    useEffect(()=>{
        handleAuth()
    })
    return (
        <div>
            <UserContext.Provider value={setUser}>
            <UserAuthContext.Provider value={handleAuth}>
            <Router>
                {window.location.pathname !== '/login' ? <Header/> : ''}
                <Routes>
                    <Route exact path={'/'} element={<TransferList/>}/>
                    <Route exact path={'/test'} element={<Test/>}/>
                    <Route exact path={'/search'} element={<Search/>}/>
                    <Route exact path={'/login'} element={<Login/>}/>
                    <Route exact path={'/create-company'} element={<CreateCompany/>}/>
                    <Route exact path={'/list-company'} element={<CompanyList/>}/>
                    <Route exact path={'/create-appointments'} element={<CreateAppointments/>}/>
                    <Route exact path={'/edit-appointments/:id'} element={<EditAppointments/>}/>
                    <Route exact path={'/driver'} element={<Driver/>}/>
                </Routes>
            </Router>
            </UserAuthContext.Provider>
            </UserContext.Provider>
        </div>
    );
};

export default App;