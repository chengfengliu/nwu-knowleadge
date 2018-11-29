'use strict';

var account = document.getElementById('account').value;
var signupSuccess = document.getElementById('signupSuccess');
if (account) {
    signupSuccess.innerHTML = "<p>注册成功！请登录</p>";
}

//在全局 定义验证码
var code;
createCode();
function createCode() {
    //创建验证码函数
    code = "";
    var codeLength = 4; //验证码的长度
    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    // 设置验证码的显示样式，并显示
    document.getElementById("discode").style.fontFamily = "Fixedsys"; //设置字体
    document.getElementById("discode").style.letterSpacing = "5px"; //字体间距
    document.getElementById("discode").style.color = "#0ab000"; //字体颜色
    document.getElementById("discode").innerHTML = code; // 显示
}
function but() {
    //验证验证码输入是否正确
    var val1 = document.getElementById("t1").value;
    var val2 = code;
    if (val1 != val2) {
        alert("验证码错误!");
        document.getElementById('t1').value = "";
        document.getElementsByTagName('button')[0].style.backgroundColor = 'grey';
        document.getElementsByTagName('button')[0].disabled = true;
    } else {
        document.getElementsByTagName('button')[0].style.backgroundColor = 'blue';
        document.getElementsByTagName('button')[0].disabled = false;
    }
}