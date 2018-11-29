"use strict";

var confirmButton = document.getElementById("confirmButton");
var nameTextbox = document.getElementById("nameText");
var accountText = document.getElementById("accountText");
var passwordTextbox = document.getElementById("passwordText");
var passwordTextbox2 = document.getElementById("passwordText2");
var information = document.getElementById("information");
var information2 = document.getElementById("information2");
var information3 = document.getElementById("information3");
var information4 = document.getElementById("information4");
var trueList = [0, 0, 0, 0];
// 点击文本框显示提示
nameTextbox.onfocus = function () {
    information.style.display = "block";
};
nameTextbox.onblur = function () {
    /*失去焦点事件*/
    var value = nameTextbox.value;
    if (countLength(value) >= 4 && countLength(value) <= 16) {
        information.innerHTML = "名称格式正确";
        information.setAttribute("class", "correct");
        nameTextbox.style.border = "1px solid lightgreen"; /*border就是文本输入框的样式*/
        trueList[0] = 1;
    } else if (countLength(value) === 0) {
        information.innerHTML = "姓名不能为空";
        information.setAttribute("class", "error");
        nameTextbox.style.border = "1px solid red";
    } else {
        information.innerHTML = "请输入长度为4~16个字符的名称";
        information.setAttribute("class", "error");
        nameTextbox.style.border = "1px solid red";
    }
};
accountText.onfocus = function () {
    information4.style.display = "block";
};
accountText.onblur = function () {
    /*失去焦点事件*/
    var value = accountText.value;
    if (countLength(value) >= 4 && countLength(value) <= 16) {
        information4.innerHTML = "账号格式正确";
        information4.setAttribute("class", "correct");
        accountText.style.border = "1px solid lightgreen"; /*border就是文本输入框的样式*/
        trueList[3] = 1;
    } else if (countLength(value) === 0) {
        information4.innerHTML = "账号不能为空";
        information4.setAttribute("class", "error");
        accountText.style.border = "1px solid red";
    } else {
        information4.innerHTML = "请输入长度为4~16个字符的账号";
        information4.setAttribute("class", "error");
        accountText.style.border = "1px solid red";
    }
};
passwordTextbox.onfocus = function () {
    information2.style.display = "block";
};
passwordTextbox.onblur = function () {
    /*失去焦点事件*/
    var value = passwordTextbox.value;
    if (countLength(value) >= 6 && countLength(value) <= 14) {
        information2.innerHTML = "密码格式正确";
        information2.setAttribute("class", "correct");
        passwordTextbox.style.border = "1px solid lightgreen"; /*border就是文本输入框的样式*/
        trueList[1] = 1;
    } else if (countLength(value) === 0) {
        information2.innerHTML = "密码不能为空";
        information2.setAttribute("class", "error");
        passwordTextbox.style.border = "1px solid red";
    } else {
        information2.innerHTML = "请输入长度为6~14个字符的密码";
        information2.setAttribute("class", "error");
        passwordTextbox.style.border = "1px solid red";
    }
};
passwordTextbox2.onfocus = function () {
    information3.style.display = "block";
};
passwordTextbox2.onblur = function () {
    /*失去焦点事件*/
    var value = passwordTextbox2.value;
    if (value === passwordTextbox.value && value.length !== 0) {
        information3.innerHTML = "密码正确";
        information3.setAttribute("class", "correct");
        passwordTextbox2.style.border = "1px solid lightgreen";
        trueList[2] = 1;
    } else {
        information3.innerHTML = "密码不一致，请再次输入";
        information3.setAttribute("class", "error");
        passwordTextbox2.style.border = "1px solid red";
    }
};
setInterval(function () {
    // console.log('test',confirmButton.disabled)
    var t = 1;
    for (var i = 0; i < trueList.length; i++) {
        if (trueList[i] === 0) {
            // alert("提交失败");
            t = 0;
            break;
        }
    }
    if (t === 1) {
        // alert("提交成功");
        confirmButton.disabled = false;
        confirmButton.setAttribute("class", "abled");
    }
}, 100);

function countLength(str) {
    /*中文字符长度为2，其它为1*/
    var inputLength = 0;
    for (var i = 0; i < str.length; i++) {
        var countCode = str.charCodeAt(i);
        if (countCode >= 0 && countCode <= 128) {
            inputLength += 1;
        } else {
            inputLength += 2;
        }
    }
    return inputLength;
}