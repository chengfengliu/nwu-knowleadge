'use strict';

var files = JSON.parse(document.getElementById('filesFromServer').innerHTML);
var downloadTimes = document.getElementById('downloadTimesFromServer').innerHTML;
var oneList = document.getElementById('oneList');
var twoList = document.getElementById('twoList');
var threeList = document.getElementById('threeList');
var fourList = document.getElementById('fourList');
var fiveList = document.getElementById('fiveList');
var sixList = document.getElementById('sixList');
var sevenList = document.getElementById('sevenList');
var eightList = document.getElementById('eightList');
var otherList = document.getElementById('otherList');
var times = document.getElementById('times');
// 文件列表
for (var i = 0, len = files.length; i < len; i++) {
    var file = files[i];
    var fileName = file.name;
    var fileBelong = file.fileBelong;
    var provider = file.provider;
    var downloadedTimes = file.downloadedTimes;
    var fileItem = document.createElement('li');
    fileItem.innerHTML = '<a class=\'downloadLink\' href=\'/api/download/' + file._id + '.' + fileName.split('.')[1] + '\' download=\'' + fileName + '\'>' + fileName + '</a><span>' + downloadedTimes + '</span><span class=\'provider\'>' + provider + '</span>';
    // 此文件下载次数加1
    fileItem.getElementsByTagName('a')[0].addEventListener('click', function (e) {
        e.target.parentNode.getElementsByTagName('span')[0].innerHTML = parseInt(e.target.parentNode.getElementsByTagName('span')[0].innerHTML) + 1;
    });
    switch (fileBelong) {
        case 'one':
            oneList.appendChild(fileItem);break;
        case 'two':
            twoList.appendChild(fileItem);break;
        case 'three':
            threeList.appendChild(fileItem);break;
        case 'four':
            fourList.appendChild(fileItem);break;
        case 'five':
            fiveList.appendChild(fileItem);break;
        case 'six':
            sixList.appendChild(fileItem);break;
        case 'seven':
            sevenList.appendChild(fileItem);break;
        case 'eight':
            eightList.appendChild(fileItem);break;
        case 'other':
            otherList.appendChild(fileItem);break;
    }
}

// AJAX
var downloadLinks = document.getElementsByClassName('downloadLink');
for (var _i = 0, _len = downloadLinks.length; _i < _len; _i++) {
    downloadLinks[_i].addEventListener('click', function () {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/api/getDownloadTimes', true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                times.innerHTML = '\u53EF\u4E0B\u8F7D\u6B21\u6570\uFF1A' + JSON.parse(xmlhttp.responseText).nowDownloadTimes;
                if (JSON.parse(xmlhttp.responseText).nowDownloadTimes <= 0) {
                    for (var _i2 = 0, _len2 = downloadLinks.length; _i2 < _len2; _i2++) {
                        downloadLinks[_i2].style.pointerEvents = 'none';
                        downloadLinks[_i2].style.color = 'grey';
                    }
                }
            }
        };
    });
}
// 第一次进入界面
if (parseInt(downloadTimes) <= 0) {
    for (var _i3 = 0, _len3 = downloadLinks.length; _i3 < _len3; _i3++) {
        downloadLinks[_i3].style.pointerEvents = 'none';
        downloadLinks[_i3].style.color = 'grey';
    }
}
var gradeList = {
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
document.getElementById('submitButton').addEventListener('click', function () {
    var isConfirm = confirm('\u4F60\u786E\u5B9A\u8981\u4E0A\u4F20\u6B64\u6587\u4EF6\u5230' + gradeList[document.getElementById('grade').value] + '\u5417\uFF1F');
    if (isConfirm) {
        // js控制表单上传
        document.getElementById('uploadForm').submit();
    }
});