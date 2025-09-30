import * as Realm from 'realm-web';
import userQuery from './User';

const app = userQuery.app
const graphqlUri = `https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`

async function saveEventData(data) {
    if (!app.currentUser) {
        console.log("No user logged in");
    }
    else console.log("Already logged in")
    const user = app.currentUser;

    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const eventsCollection = mongodb.db('ecertify').collection('events');

    const { eventName, certificateUrl, xpos, ypos, eventDate, participants, totalParticipants } = data

    const result = await eventsCollection.updateOne({ eventName }, {
        $set: {
            certificateUrl,
            xpos,
            ypos,
            eventDate,
            participants,
            totalParticipants
        }
    }, { upsert: true });

    if (!result.matchedCount) {
        console.log(`Adding new event  ${eventName}`);
        return 1;
    }
    else {
        console.log(`Updated ${result.modifiedCount} event ${eventName}`);
        return 0;
    }
}

function composeData(pos, parti) {
    const data = {
        eventName: document.getElementById('inputeventname').value,
        certificateUrl: document.getElementById('inputcert').value,
        xpos: pos.x,
        ypos: pos.y,
        eventDate: document.getElementById('inputdate').value,
        participants: parti,
        totalParticipants: parti.length
    }
    return data
}

async function fetchGraphql(gquery) {
    const token = await userQuery.getValidAccessToken();
    const response = await fetch(graphqlUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: gquery
        })
    });
    const res = await response.json();
    return res;
}

async function fetchEvents() {
    const query = `
        query {
        events {
            eventName
            eventDate
            totalParticipants
        }
        }
    `
    return await fetchGraphql(query);
}


const updateUtils = { saveEventData, composeData, fetchEvents, fetchGraphql }

export default updateUtils;
