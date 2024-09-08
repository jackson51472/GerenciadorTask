import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Sidebar from './Sidebar/Sidebar';
import React from 'react';
import RightUser from './RightUser/RightUser';
import Account from "./Account/Account";
import {getStoredUser} from "../services/APIService";
import {ToastContainer} from "react-toastify";
import Home from "./Home/Home";

const App = () => {

    const user = getStoredUser();

    return (

        <Router>
            <div className="app">
                <RightUser user={user} />
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/perfil" element={<Account />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
