import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import userQuery from '../helper/User.js'
import '../css/Dashboard.css'
import Dashmenu from './Dashmenu'
import DashAddEvent from './DashAddEvent.js';

export default function Dashboard() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = React.useState(userQuery.isLoggedIn());

    React.useState(() => {
        setIsLoggedIn();
        if (isLoggedIn === false) {
            alert("You are not logged in!")
            navigate("/");
            window.location.href = "/"
        }
    }, []);

    return (
        <div className="dashboard">
            <Dashmenu />
            <Outlet />
        </div>

    )

}
