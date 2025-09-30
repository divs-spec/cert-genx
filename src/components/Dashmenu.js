import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Dashmenu.css'

import userInfo from '../helper/User.js'

export default function Dashmenu() {

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div className="toggle-icon" onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
            </div>
            <div className={`dashmenu ${showMenu ? 'show' : ''}`}>
                <ul>
                    <li><a href="#" className="secondary" onClick={() => navigate('/dashboard/events')}>Events</a></li>
                    <li><a href="#" className="secondary" onClick={() => navigate('/dashboard/add-event')}>Add Event</a></li>
                    <li><a href="#" className="secondary"  onClick={() => navigate('/dashboard/settings')}>How to use</a></li>
                    <li><a href="#" className="secondary"  onClick={() => userInfo.logout()}>Logout</a></li>
                </ul>
            </div>
        </>
    )
}
