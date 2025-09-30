import React, { useEffect, useState } from "react";
import '../css/DownloadCert.css'

import downUtils from "../helper/Downloader";


export default function DownloadCert() {
    const [events, setEvents] = useState([]);
    const [certDetails, setCertDetails] = useState(null);

    useEffect(() => {
        downUtils.getEventsList().then(res => {
            if (res === null) setEvents([])
            else setEvents(res);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msg = document.getElementById("down-msg");
        const dbtn = document.getElementById("down-btn");

        const pid = e.target.pid.value;

        if(pid==='' || e.target.event.selectedIndex === 0){
            msg.innerText = "Please fill all the fields !!";
            msg.style.color = "red";
            msg.style.visibility = "visible";
            dbtn.style.visibility = "hidden";
            return;
        }
        const eventId = events[e.target.event.selectedIndex - 1]._id;

        const certInfo = await downUtils.getMatchedCert(pid, eventId);
        setCertDetails(certInfo.data);
        console.log(certInfo);
        if (certInfo.status === "success") {
            msg.innerText = "Certificate found for " + certInfo.data.participantName + "";
            msg.style.color = "green";
            dbtn.style.visibility = "visible";
        }
        else {
            msg.innerText = "No certificate found";
            msg.style.color = "red";
            dbtn.style.visibility = "hidden";
        }
        msg.style.visibility = "visible";
    };


    return (
        <div id="download-cert">
            <form onSubmit={handleSubmit}>
                <h2>Download Certificate</h2>
                <label htmlFor="pid">Enter your id:
                    <input name="pid" placeholder="divvi0202@gmail.com"  type="text" />
                </label>
                <label htmlFor="event">
                    Event:
                    <select name="event" id="input_event">
                        <option value="">--Select an Event--</option>
                        {events.map((event) => (
                            <option value={event.eventName} key={event._id}>{event.eventName}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>

                <p id="down-msg">X</p>

            </form>
            <button id="down-btn" onClick={()=>downUtils.makeCert(certDetails)}>Download</button>
        </div>
    );
};
