'use strict';

var momentsPagesCount = parseInt(document.getElementById('pageCountFromServer').innerHTML);
var momentsPage = parseInt(document.getElementById('currentPageNoFromServer').innerHTML);
var videoCanvas = document.getElementById('videoCanvas');
var videoCtx = videoCanvas.getContext('2d');
var momentsList = document.getElementById('momentsList');
var pagesList = document.getElementById('pagesList');
var image = document.getElementById('image');
// 10条想法为一页
// let pageNumber = (moments.length / 10) + 1;
for (var i = 1; i < momentsPagesCount + 1; i++) {
    var page = document.createElement('li');
    //还要重定向get moments
    if (i === 1) {
        page.innerHTML = "<a href='/moments'>" + i + "</a>";
        if (parseInt(momentsPage) === 1) {
            page.className = 'active';
        }
    } else if (i === parseInt(momentsPage)) {
        page.innerHTML = "<a href='/moments'>" + i + "</a>";
        page.className = 'active';
    } else {
        page.innerHTML = "<a href='/moments/" + i + "'>" + i + "</a>";
    }
    // page.addEventListener('click',function(){
    //     let request = new XMLHttpRequest();
    //     request.open('POST','/api/page',true);
    //     request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //     request.send("pageNo="+i);
    // })
    pagesList.appendChild(page);
}
// for(let i = (pageNo * 10) - 10; i < pageNo * 10; i++) {          
//     let item = document.createElement('li');
//     if(moments[i]) {
//         item.innerHTML = moments[i] + "<form action='/deleteMoment'" +
//         //怎样弄才能更加简洁？ AJAX
//         "method='POST'>"+"<input style='display:none'name='index'value='"+ moment +"'>" + 
//         "<button>删除</button></form>";
//         momentsList.appendChild(item); 
//     } else {
//         break;
//     }

// }

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var update = document.getElementById('update');
var ctx = canvas.getContext('2d');
var width = 160;
var height = 160;
var haveTakedPhoto = false;
canvas.width = width;
canvas.height = height;
function liveVideo() {
    var URL = window.URL || window.webkitURL;
    // navigator.getUserMedia({
    //     video: true
    // }, stream => {
    //     video.src = URL.createObjectURL(stream);
    //     video.play();
    //     document.getElementById('snap').addEventListener('click', () => {
    //         ctx.drawImage(video, 0, 0, width, height);
    //     });
    // }, error => {
    //     console.log(error.name || error);
    // });
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (stream) {
        video.src = URL.createObjectURL(stream);
        video.play();
        document.getElementById('snap').addEventListener('click', function () {
            ctx.drawImage(video, 0, 0, width, height);
            haveTakedPhoto = true;
        });
    }).catch(function (err) {
        console.log(err.name || err);
    });
}
document.getElementById('live').addEventListener('click', function () {
    videoCanvas.style.display = 'none';
    liveVideo();
});

update.addEventListener('click', function () {
    var momentValue = document.getElementById('moment').value;
    if (!momentValue) {
        alert('想法不能为空！');
        return;
    } else if (!haveTakedPhoto) {
        alert('图片不能为空！');
        return;
    }
    var request = new XMLHttpRequest();
    request.open('POST', '/api/updateMoments');
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("moment=" + momentValue + '&image=' + canvas.toDataURL());
});

// document.getElementById('test').addEventListener('click', ()=> {
//     let request = new XMLHttpRequest();
//     request.open('GET', '/api/testBase64');
//     request.send();
// request.onreadystatechange = () => {
//     if(request.readyState === 4 && request.status === 200) {
//         document.getElementById('testImage').src= "data:image/png;base64," + request.responseText;
//     }
// }
// });

// document.getElementById('downloadVideo').addEventListener('click', ()=> {
//     const _that = this
//     let request = new XMLHttpRequest();
//     request.open('GET', '/api/downloadVideo');
//     request.send()
//     request.onreadystatechange = () => {
//         if(request.readyState === 4 && request.status === 200) {
//             console.log('222')
//             _that.download = 'video'
//         }
//     }
// });
// document.getElementById('downloadVideo').download = 'video.flv'
// 遮挡摄像头的画布
videoCtx.fillStyle = '#000';
videoCtx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);