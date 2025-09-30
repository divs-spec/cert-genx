import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/DashAddEvent.css'

import userQuery from '../helper/User.js'
import certUtils from '../helper/Certificate.js'
import CSVToJson from './DashAddEventParticipants'


export default function DashAddEvent() {

    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    const [imgx, setImgx] = React.useState(null);
    const [participants, setParticipants] = React.useState(null);

    function makeDownload() {
        certUtils.DownloadSample(imgx, "Kartik Sharma", pos.x, pos.y);
    }

    return (
        <div className="add-event">
            <h2 className="subtitle">Add Event</h2>
            <div className="content">
                <form onSubmit={(e) => { e.preventDefault(); certUtils.handleSubmit(pos, participants) }}>
                    <div className="grid">
                        <label htmlFor="event_name">Event Name
                            <input type="text" id="inputeventname" name="event_name" placeholder="ABC Workshop" required />
                        </label>
                    </div>

                    <label htmlFor="file1">Choose Participant List: <br/>(must have header row with id & name fields)
                        <input type="file" id="file1" accept=".csv, .txt" name="file1"
                            onChange={() => certUtils.selectFields(setParticipants)} required />
                    </label>

                    <div className="cin">
                        <sub>Select ID Field:</sub>
                        <sub>Select Name Field:</sub>
                        <select id="inputid" required
                            onChange={() => certUtils.updateParticipants(setParticipants)} ></select>
                        <select id="inputname" required
                            onChange={() => certUtils.updateParticipants(setParticipants)} ></select>
                    </div>

                    <label htmlFor="cert">
                        Certificate Link [<a href="https://imgur.com/upload" target="_blank">Upload</a> & paste shareable link]
                        <input type="text" id="inputcert" name="cert" placeholder="https://imgur.com/5toV6lA"
                            onChange={() => certUtils.selectPos(setPos, setImgx)} required />
                    </label>

                    <sub id="cview">Select Name position: </sub>
                    <sub id="pos">({pos.x},{pos.y})</sub>
                    <sub id="dview" onClick={makeDownload}><a>&nbsp;&nbsp;&nbsp;View sample certificate</a></sub>
                    <img id="tempView" src="" />

                    <label htmlFor="date">Date
                        <input type="date" id="inputdate" name="date" required />
                    </label>
                    
                    <p id="submit-msg"></p>

                    <button type="submit">CREATE</button>

                </form>
            </div>

        </div >

    )

}
