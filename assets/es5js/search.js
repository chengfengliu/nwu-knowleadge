"use strict";

var institute = document.getElementById("institute");
var marjor = document.getElementById("marjor");
var course = document.getElementById("course");
var button = document.getElementById("search");
var marjorList = {
    information: [["计算机科学与技术", 100], ["软件工程", 50], ["信息与通信工程", 100], ["物联网", 100], ["电子科学与技术", 100]],
    culture: [["汉语言文学", 100], ["中国语言文学", 101], ["广播电视编导", 102], ["戏剧影视文学", 103], ["对外汉语教育", 104]]
};
var courseList = {
    "计算机科学与技术": [["程序设计基础", 17], ["离散数学", 9], ["数据结构", 16], ["数字逻辑", 10], ["电子技术基础", 22], ["概率论", 7], ["操作系统", 2], ["计算机组成原理", 2], ["数据库", 5], ["微机原理", 3], ["单片机原理", 3], ["计算机网络", 16], ["软件工程", 1], ["Linux程序设计", 4], ["JAVA", 11], ["图形学", 7], ["体系结构", 10], ["人机交互", 4], ["编译技术", 24], ["人工智能", 3], ["数字图像处理", 7], ["嵌入式系统", 1], ["多媒体技术", 2], ["项目管理", 5], ["互联网络程序设计", 8], ["网络安全", 47]],
    "软件工程": [["C语言", 10], ["C++语言", 20], ["JAVA语言", 10]]
};
function selectDistrict(source, target, list) {
    var selected = source.options[source.selectedIndex].value;
    target.innerHTML = "";
    for (var i = 0; i < list[selected].length; i++) {
        var opt = document.createElement("option");
        opt.value = list[selected][i][0];
        opt.innerHTML = list[selected][i][0];
        target.appendChild(opt);
    }
}
button.addEventListener("click", function () {
    var number1, number2;
    var courseSelected = course.options[course.selectedIndex].value;
    var courseListSelected = courseList[marjor.options[marjor.selectedIndex].value];
    var marjorSelected = marjor.options[marjor.selectedIndex].value;
    var marjorListSelected = marjorList[institute.options[institute.selectedIndex].value];
    for (var i = 0; i < courseListSelected.length; i++) {
        if (courseListSelected[i][0] == courseSelected) {
            number1 = i;
            break;
        }
    }
    for (var j = 0; j < marjorListSelected.length; j++) {
        if (marjorListSelected[j][0] == marjorSelected) {
            number2 = j;
            break;
        }
    }
    var rate = courseListSelected[number1][1] / marjorListSelected[number2][1];
    document.getElementById("result").innerHTML = "挂科率为" + rate * 100 + "%";
});