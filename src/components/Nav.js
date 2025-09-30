import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '@picocss/pico'
import '../css/Nav.css'

import userQuery from '../helper/User.js'

export default function Nav() {
    const navigate = useNavigate()
    const location = useLocation()

    const isLoggedIn = userQuery.isLoggedIn()
    const userid = userQuery.getUser()

    return (
        <nav>
            <ul>
                <li><a className="secondary" onClick={() => { navigate("/") }}>Home</a></li>
            </ul>
            <ul>
                <li><>eCertify</></li>
            </ul>
            {isLoggedIn ? (
                <ul>
                    <li>
                        <a className="secondary" onClick={() => { navigate("/dashboard/events") }}>
                            <sup>({userid}) </sup>
                            Dashboard
                        </a>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <a className="secondary" onClick={() => { navigate('/login') }}>
                            Admin Login
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    )
}
