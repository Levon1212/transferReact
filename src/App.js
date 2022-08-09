import React from 'react';
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
const App = () => {
    return (
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path={'/'} element={<TransferList/>}/>
                    <Route exact path={'/create-company'} element={<CreateCompany/>}/>
                    <Route exact path={'/list-company'} element={<CompanyList/>}/>
                    <Route exact path={'/create-appointments'} element={<CreateAppointments/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;