import React from "react";

import '../css/DashAbout.css'

export default function DashSettings() {
    return (
        <div id="dash-about">
            <ul type="disk">
                <li>
                    <b>➼</b> Made with <b>React</b> but with no other fancy css frameworks.
                </li>
                <li>
                    <b>➼</b> Certificates are generated <b>on-the-fly</b> when user details are matched with database.
                </li>
                <li>
                    <b>➼</b> Used <b>Graphql</b> for fetching data along with <b>mongodb</b>, so it would be fairly easy to extend
                </li>
            </ul>

            <h3 class="title">How to use</h3>
            <table>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>While adding a new event, the <b>participant list</b> should be in <b>csv format</b> and have a <b>header row.</b> (Google form' response csv export have headers by default)</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>An <b>ID field</b> and a <b>Name field</b> should be set from <b>header fields</b>. Certificate can be downloaded by entering one of the id in this field.</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>A <b>raw link</b> of Certificate image should be pasted either by uploading on imgur or else.</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>The <b>image area</b> should be visible immediately after entering certificate link, if not there is problem in certficate link. (May not be raw link)</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Within that image area, select x-position and y-position of the name, where it should be placed. (<b>View sample certificate</b> to confirm using the link created above the image area)</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>To <b>update an event</b>, you can add a new event with the same name but different details. You can also update an event immediately just after Creating.</td>
                    </tr>
                </tbody>
            </table>
            <b>Sample Data:</b>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Asset</th>
                        <th scope="col">Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Participant List (ctrl+s to save)</th>
                        <td><a href="https://raw.githubusercontent.com/jtstatic/raw/main/Untitled%20form%20(Responses)%20-%20Form%20Responses%201.csv" target="_blank">Untitled form (Responses) - Form Responses 1</a></td>
                    </tr>
                    <tr>
                        <th scope="row">Certificate Link (copy & paste)</th>
                        <td><a href="https://imgur.com/5toV6lA" target="_blank">https://imgur.com/5toV6lA</a></td>
                    </tr>
                    <tr>
                        <th scope="row">Info: Header rows</th>
                        <td>Select ID Field: <u>Email Address</u> | Select Name Field: <u>Name</u></td>
                    </tr>
                    <tr>
                        <th scope="row">Info: Position (reference only)</th>
                        <td>xpos: <u>750</u> | ypos: <u>390</u></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}
