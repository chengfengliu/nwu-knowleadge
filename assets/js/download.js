const files = JSON.parse(document.getElementById('filesFromServer').innerHTML)
const downloadTimes = document.getElementById('downloadTimesFromServer').innerHTML
const oneList = document.getElementById('oneList')
const twoList = document.getElementById('twoList')
const threeList = document.getElementById('threeList')
const fourList = document.getElementById('fourList')
const fiveList = document.getElementById('fiveList')
const sixList = document.getElementById('sixList')
const sevenList = document.getElementById('sevenList')
const eightList = document.getElementById('eightList')
const otherList = document.getElementById('otherList')
const times = document.getElementById('times')
// 文件列表
for(let i = 0, len = files.length; i < len; i++){
    const file = files[i];
    const fileName = file.name;
    const fileBelong = file.fileBelong;
    const provider = file.provider;
    const downloadedTimes = file.downloadedTimes;
    const fileItem = document.createElement('li');
    fileItem.innerHTML = `<a class='downloadLink' href='/api/download/${file._id}.${fileName.split('.')[1]}' download='${fileName}'>${fileName}</a><span>${downloadedTimes}</span><span class='provider'>${provider}</span>`;
    // 此文件下载次数加1
    fileItem.getElementsByTagName('a')[0].addEventListener('click', (e) => {
        e.target.parentNode.getElementsByTagName('span')[0].innerHTML = parseInt(e.target.parentNode.getElementsByTagName('span')[0].innerHTML) + 1
    })
    switch(fileBelong) {
        case 'one': oneList.appendChild(fileItem);break;
        case 'two': twoList.appendChild(fileItem);break;
        case 'three': threeList.appendChild(fileItem);break;
        case 'four': fourList.appendChild(fileItem);break;
        case 'five': fiveList.appendChild(fileItem);break;
        case 'six': sixList.appendChild(fileItem);break
        case 'seven': sevenList.appendChild(fileItem);break
        case 'eight': eightList.appendChild(fileItem);break;
        case 'other': otherList.appendChild(fileItem);break;
    }
}

// AJAX
const downloadLinks = document.getElementsByClassName('downloadLink');
for( let i = 0, len = downloadLinks.length; i < len; i++) {
    downloadLinks[i].addEventListener('click', () => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/api/getDownloadTimes', true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                times.innerHTML = `可下载次数：${JSON.parse(xmlhttp.responseText).nowDownloadTimes}`;
                if (JSON.parse(xmlhttp.responseText).nowDownloadTimes <= 0) {
                    for( let i = 0, len = downloadLinks.length; i < len; i++) {
                        downloadLinks[i].style.pointerEvents = 'none';
                        downloadLinks[i].style.color = 'grey';
                    }
                }
            }
        }
    })
}
// 第一次进入界面
if (parseInt(downloadTimes) <= 0) {
    for( let i = 0, len = downloadLinks.length; i < len; i++) {
        downloadLinks[i].style.pointerEvents = 'none';
        downloadLinks[i].style.color = 'grey';
    }
}
const gradeList = {
    'one': '大一上',
    'two': '大一下',
    'three': '大二上',
    'four': '大二下',
    'five': '大三上',
    'six': '大三下',
    'seven': '大四上',
    'eight': '大四下',
    'other': '其他'
};
document.getElementById('submitButton').addEventListener('click', () => {
    const isConfirm = confirm(`你确定要上传此文件到${gradeList[document.getElementById('grade').value]}吗？`);
    if(isConfirm) {
        // js控制表单上传
        document.getElementById('uploadForm').submit();
    }
})