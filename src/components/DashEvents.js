import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/DashEvents.css'
import userQuery from '../helper/User';

import eventUtils from '../helper/Events';
const app = userQuery.app



const deleteEvent = async (eventName) => {
    if (!app.currentUser) {
        console.log("No user logged in");
        return -1;
    }
    else console.log("Already logged in")

    const user = app.currentUser;
    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const eventsCollection = mongodb.db('ecertify').collection('events');

    const result = await eventsCollection.deleteOne({ eventName });
    if(result.deletedCount === 1) return true;
    else return false;
}

export default function DashEvents() {

    const [eventList, setEventList] = React.useState([]);

    async function handleDelete(eventName) {
        const result = await deleteEvent(eventName);

        if (result === true) {
            console.log(`Deleted event ${eventName}`);
            setEventList(eventList.filter(event => event.eventName !== eventName));
            return 0;
        }
        else {
            console.log(`Error deleting event ${eventName}: ${result}`);
            console.log(result)
            return -1;
        }
    }
        

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await eventUtils.getEvents();
            if (data === null) {
                console.log("Temporary Blocked")
                setEventList([]);
            }
            else if (data === []) {
                console.log("No events")
                setEventList(["No events"]);
            }
            else setEventList(data);
        }
        fetchData();
    }, []);

    return (
        <div className="events">
            <h2 className="subtitle">Events</h2>
            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Event</th>
                            <th scope="col">Date</th>
                            <th scope="col">Count</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventList.map((event, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{event.eventName}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.totalParticipants}</td>
                                <td><a onClick={() => handleDelete(event.eventName)}>Delete</a></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
