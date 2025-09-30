import jsPDF from 'jspdf';


const endpoint = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-akmie/endpoint'


async function getEventsList() {
    const url = endpoint + '/allevents'
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

async function getMatchedCert(pid, eventId) {
    console.log(pid, eventId)
    if (pid == '' || eventId == '' || eventId == undefined) return null;
    const url = endpoint + '/get_cert' + `?eventId=${eventId}&participantId=${pid}`
    console.log(url)
    const response = await fetch(url);
    if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    return res;
}

async function makeCert(certDetails) {
    const {participantName, xpos, ypos, certificateUrl} = certDetails;
    console.log("Generating from",certDetails)

    var img = new Image()
    img.src = certificateUrl
    img.onload = () => {
        const [iw, ih] = [img.naturalWidth, img.naturalHeight]
        console.log(iw, ih)

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [ih, iw]
        });

        doc.addImage(img, 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

        doc.setFontSize(50);
        doc.text(`${participantName}`, xpos, ypos, { align: 'center' })

        doc.save(`${participantName}.pdf`);
    }
}


const downUtils = { getEventsList, getMatchedCert, makeCert }

export default downUtils;
