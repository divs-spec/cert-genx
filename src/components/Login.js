import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'

import userQuery from '../helper/User.js'


export default function Login() {

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault();

        let userid = document.getElementById("userid").value;
        let userpass = document.getElementById("userpass").value;
        let rem = document.getElementById("usermem").checked;


        let loggedIn = await userQuery.login(userid, userpass, rem);

        if (loggedIn === true) {
            navigate("/dashboard/events");
        }
        else {
            let msg = document.getElementById("login-msg");
            msg.style.color = "red";
            msg.style.visibility = "visible";
        }
    }

    return (
        <div className="login">
            <center>
                <form onSubmit={(e) => handleLogin(e)}>
                    <input
                        type="text"
                        name="login"
                        placeholder="Login"
                        autocomplete="id"
                        id="userid"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autocomplete="password"
                        id="userpass"
                        minLength="3"
                        required
                    />
                    <fieldset>
                        <label for="remember">
                            <input type="checkbox" role="switch" id="usermem" name="remember" />
                            Remember me
                        </label>
                    </fieldset>
                    <p id="login-msg">Invalid credentials</p>
                    <button type="submit" className="contrast" onclick="event.preventDefault()">Login</button>
                </form>
            </center>
        </div>
    )
}
