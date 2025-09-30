import { jsPDF } from "jspdf";
import Papa from 'papaparse'
import updateUtils from "./Updater";
// import timg from './TestImg'


function DownloadSample(imgx, name, nx, ny) {
    var img = new Image()
    img.src = imgx
    img.onload = () => {
        const [iw, ih] = [img.naturalWidth, img.naturalHeight]

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [ih, iw]
        });

        doc.addImage(img, 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.setFontSize(50);
        doc.text(`${name}`, nx, ny, { align: "center" })

        // doc.save('temp.pdf');
        doc.output('dataurlnewwindow');

    }
}

function convertImgurUrl(url) {
    if (url.startsWith('https://imgur.com/a/')) {
        const urlParts = url.split('/');
        const imageId = urlParts[4];
        const newUrl = `https://i.imgur.com/${imageId}.jpeg`;
        return newUrl;
    }
    else if (url.startsWith('https://imgur.com/')) {
        const urlParts = url.split('/');
        const domain = urlParts[2];
        const imageId = urlParts[3];
        const newUrl = `https://i.${domain}/${imageId}.jpeg`;
        return newUrl;
    }
    else return url;
}


function convertPixels(x, y, imgWidth, imgHeight, newWidth, newHeight) {
    const xScale = newWidth / imgWidth;
    const yScale = newHeight / imgHeight;
    const newX = Math.round(x * xScale);
    const newY = Math.round(y * yScale);
    return [newX, newY];
}

function selectPos(setPos, setImgx) {
    const certInput = document.getElementById('inputcert');
    const imgView = document.getElementById('tempView');
    certInput.value = convertImgurUrl(certInput.value)

    const img = new Image();
    img.onload = function () {
        setImgx(certInput.value);
        imgView.src = certInput.value;
    }
    img.onerror = function () {
        setImgx(null)
        imgView.src = null
    }
    img.src = certInput.value;


    imgView.addEventListener('click', ({ offsetX: x, offsetY: y }) => {
        document.getElementById('dview').style.visibility = 'visible';

        const [cw, ch] = [imgView.offsetWidth - 1, imgView.offsetHeight - 1];
        const [iw, ih] = [imgView.naturalWidth, imgView.naturalHeight];
        const [nx, ny] = convertPixels(x, y, cw, ch, iw, ih);

        setPos({ x: nx, y: ny });

        console.log("BOARD:", cw, ch);
        console.log("NAME:", x, y);
        console.log("CERTIFICATE:", iw, ih);
        console.log("CONVERTED NAME:", ...convertPixels(x, y, cw, ch, iw, ih));
    });
}


function ShowOpt(header) {
    document.getElementsByClassName('cin')[0].style.display = 'grid';
    document.getElementById('inputid').innerHTML = header.map((item) => `<option value="${item}">${item}</option>`);
    document.getElementById('inputname').innerHTML = header.map((item) => `<option value="${item}">${item}</option>`);
}

function selectFields() {
    const fileInput = document.getElementById('file1');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        var res = Papa.parse(reader.result, {
            header: true,
        });
        ShowOpt(res.meta.fields)
        console.log(res)
    }
    reader.readAsText(file);
}

function updateParticipants(setParticipants) {
    const fileInput = document.getElementById('file1');
    const id = document.getElementById('inputid').value;
    const name = document.getElementById('inputname').value;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        var res = Papa.parse(reader.result, {
            header: true,
        });
        const result = res.data.map((obj) => ({
            id: obj[id],
            name: obj[name],
        }));
        setParticipants(result)
        console.log(result)
    }
    reader.readAsText(file);
}

function handleSubmit(pos, parti) {
    const data = updateUtils.composeData(pos, parti)
    updateUtils.saveEventData(data).then((up) => {
        console.log(data)
        console.log(up)
        const msg = document.getElementById('submit-msg');
        if (up === 0) {
            msg.innerHTML = "Event Updated!"
            msg.style.color = 'red'
        }
        else if (up === 1) {
            msg.innerHTML = "New Event Created!"
            msg.style.color = 'green'
        }
        msg.style.visibility = 'visible';
    })


}


const certUtils = { DownloadSample, selectPos, selectFields, updateParticipants, handleSubmit }

export default certUtils;
