let momentsPagesCount = parseInt(document.getElementById('pageCountFromServer').innerHTML);
let momentsPage = parseInt(document.getElementById('currentPageNoFromServer').innerHTML);
let videoCanvas = document.getElementById('videoCanvas');
let videoCtx = videoCanvas.getContext('2d');
const momentsList = document.getElementById('momentsList');
const pagesList = document.getElementById('pagesList');
const image = document.getElementById('image');
// 10条想法为一页
// let pageNumber = (moments.length / 10) + 1;
for(let i = 1; i < momentsPagesCount + 1; i++) {
    let page = document.createElement('li');
    //还要重定向get moments
    if(i === 1) {
        page.innerHTML = "<a href='/moments'>" + i + "</a>";
        if(parseInt(momentsPage) === 1) {
            page.className = 'active';
        }
    } else if (i === parseInt(momentsPage)) {
        page.innerHTML = "<a href='/moments'>" + i + "</a>";
        page.className = 'active';
    } else {
        page.innerHTML = "<a href='/moments/"+ i + "'>" + i + "</a>";
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

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const update = document.getElementById('update');
const ctx = canvas.getContext('2d');
const width = 160;
const height = 160;
let haveTakedPhoto = false;
canvas.width = width;
canvas.height = height;
function liveVideo () {
    const URL = window.URL || window.webkitURL;
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
    }).then(stream => {
        video.src = URL.createObjectURL(stream);
        video.play();
        document.getElementById('snap').addEventListener('click', () => {
            ctx.drawImage(video, 0, 0, width, height);
            haveTakedPhoto = true;
        });
    }).catch(err => {
        console.log(err.name || err);
    });
}
document.getElementById('live').addEventListener('click', () => {
    videoCanvas.style.display = 'none';
    liveVideo();
});

update.addEventListener('click', () => {
    let momentValue = document.getElementById('moment').value;
    if(!momentValue) {
        alert('想法不能为空！');
        return;
    } else if (!haveTakedPhoto) {
        alert('图片不能为空！');
        return;
    }
    let request = new XMLHttpRequest();
    request.open('POST', '/api/updateMoments');
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send("moment=" + momentValue + '&image=' + canvas.toDataURL());
})

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