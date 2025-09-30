import userQuery from './User.js'
import updateUtils from './Updater.js';

var eventsList = []

async function getEvents() {
    if (eventsList.length > 0) {
        console.log("Serving events from cache")
        console.log(eventsList)
        return eventsList;
    }
    const data = await updateUtils.fetchEvents();
    if (data.data === undefined) {
        return null
    } else {
        eventsList = data.data.events;
    }
    console.log(data);
    return eventsList;
}


const eventUtils = { getEvents }

export default eventUtils
