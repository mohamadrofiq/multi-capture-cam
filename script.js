'use strict';

const camera1 = document.getElementById('camera1');
const camera2 = document.getElementById('camera2');
const camera3 = document.getElementById('camera3');

const cleanUp = (whichCamera) => {
    try {
        const stream = camera1.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    } catch (error) { }
}
cleanUp(camera1);
cleanUp(camera2);
cleanUp(camera3);


const myVideoInputs = [];
const doGetDevicesInfo = async () => {
    await navigator.mediaDevices.enumerateDevices()
        .then(results => {
            // console.log(results)
            results.forEach(result => {
                if (result.kind === 'videoinput') {
                    console.log(result);
                    myVideoInputs.push(result);
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
}

const startCamera = async (myVideoInput, whichCamera) => {
    if (myVideoInput === undefined) { console.log('myVideoInput is undefined'); return; }
    await navigator.mediaDevices.getUserMedia({
        video: {
            width: { min: 2280 }, height: { min: 1720 },
            deviceId: myVideoInput.deviceId
        }
    })
        .then(stream => {
            whichCamera.srcObject = stream;
        })
        .catch(error => {
            console.log(error);
        })
}

const doStartCamera = (button) => {
    const id = button.id;
    switch (id) {
        case 'startCamera1':
            startCamera(myVideoInputs[0], camera1);
            break;
        case 'startCamera2':
            startCamera(myVideoInputs[1], camera2);
            break;
        case 'startCamera3':
            startCamera(myVideoInputs[2], camera3);
            break;
    }
}

const doCaptureSnapShot = (button) => {
    const id = button.id;
    switch (id) {
        case 'capture1':
            captureImage(camera1, canvas1);
            break;
        case 'capture2':
            captureImage(camera2, canvas2);
            break;
        case 'capture3':
            captureImage(camera3, canvas3);
            break;
    }
}
const captureAll = (button) => {


    captureImage(camera1, canvas1);

    captureImage(camera2, canvas2);

    captureImage(camera3, canvas3);


}

const captureImage = (camera, canvas) => {
    canvas.width = 2560; canvas.height = 1440;
    canvas.getContext('2d').drawImage(camera, 0, 0, 2560, 1440);
}

// const download_img = function (el) {
//     var canvas = document.getElementById("canvas1");
//     var canvas2 = document.getElementById("canvas2");
//     // var canvas3 = document.getElementById("canvas2");

//     var image = canvas.toDataURL("image/jpg");
//     el.href = image;
//     var image2 = canvas2.toDataURL("image/jpg");
//     el.href = image2;
// }
const download_img = function (link) {
    var images = document.getElementsByTagName("canvas");
    var srcList = [];
    var i = 0;

    var timer = setInterval(function () {
        if (images.length > i) {
            var link = document.createElement("a");
            srcList.push(images[i].src);
            link.id = i;
            link.download = "pass.jpg";
            link.href = images[i].toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();
            i++;
        } else {
            clearInterval(timer);
        }
    }, 1500);
}
