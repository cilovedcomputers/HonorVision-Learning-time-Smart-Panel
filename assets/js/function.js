var focus_window = "none";
const blurbox = document.getElementById("blur-box");
const setup_window = document.getElementById("theme-setup-window");
const app_info = document.getElementById("appinfo");
const homework = document.getElementById("homework");
document.getElementById("homework-edit-button").onclick = edit_homework;
// document.getElementById("monitor-edit-button").onclick = edit_monitor;

class EditButton {
    constructor(button, textbox, storagestr) {
        this.button = button;
        this.textbox = textbox;
        this.storagename = storagestr;
        if (localStorage.getItem(this.storagename) == "" || localStorage.getItem(this.storagename) == undefined || localStorage.getItem(this.storagename) == null) {
            this.textbox.innerHTML = "(Empty)";
        } else {
            this.textbox.innerHTML = localStorage.getItem(this.storagename);
        }
        this.button.children[0].src = 'assets/img/edit.svg';
        this.button.onclick = () => { this.edit() };
    }
    edit() {
        // console.log(this.textbox);
        this.textbox.contentEditable = 'true';
        this.textbox.focus();
        this.button.onclick = () => { this.apply() };
        this.button.children[0].src = 'assets/img/ok.svg';
        // this.button.innerHTML = '<img src="assets/img/ok.svg" width="16px" alt="Edit" />';
    }
    apply() {
        this.textbox.contentEditable = 'false';
        if (this.textbox.innerHTML == "") {
            this.textbox.innerHTML = "(Empty)";
        }
        localStorage.setItem(this.storagename, this.textbox.innerHTML);
        this.button.onclick = () => { this.edit() };
        this.button.children[0].src = 'assets/img/edit.svg';
        // this.button.innerHTML = '<img src="assets/img/edit.svg" width="16px" alt="Edit" />';
    }
}

Notification.requestPermission().then((result) => {
    // document.getElementById("notify-debug2").innerHTML = "[调试信息] Notification.requestPermission() 返回值 " + result + " @localhost";
    // console.log("[调试信息] Notification.requestPermission() 返回值 " + result + " @localhost");
});

function fadeIn(element, speed) {
    // console.log(element);
    if (element.style.opacity != 1) {
        var speed = speed || 30;
        var num = 0;
        var st = setInterval(function () {
            num++;
            element.style.opacity = num / 10;
            if (num >= 10) { clearInterval(st); }
        }, speed);
    }
}

function fadeOut(element, speed) {
    // console.log(element);
    if (element.style.opacity != 0) {
        var speed = speed || 30;
        var num = 10;
        var st = setInterval(function () {
            num--;
            element.style.opacity = num / 10;
            // console.log(num / 10);
            if (num <= 0) { clearInterval(st); }
        }, speed);
    }
}

function theme_setup() {
    $("#blur-box").css("display", "flex");
    $("#blur-box").css("z-index", "9");
    fadeIn(blurbox, 15);
    $("#theme-setup-window").css("display", "flex");
    $("#theme-setup-window").css("z-index", "10");
    focus_window = "theme-setup-window";
    $("#theme-setup-window").css("background-color", getComputedStyle(document.getElementById("navbar")).backgroundColor);
}

function show_info() {
    $("#blur-box").css("display", "flex");
    $("#blur-box").css("z-index", "9");
    fadeIn(blurbox, 15);
    $("#info-window").css("display", "flex");
    $("#info-window").css("z-index", "10");
    focus_window = "info-window";
    $("#info-window").css("background-color", getComputedStyle(document.getElementById("navbar")).backgroundColor);
    app_info.innerHTML = info;
    setTimeout(()=>{$("#info-window").css("backdrop-filter", "saturate(100%) blur(15px)");},1000)
    
}

function hide_window() {
    fadeOut(blurbox, 15);
    setTimeout(() => {
        $("#" + focus_window).css("display", "none");
        $("#" + focus_window).css("z-index", "-3");
        $("#" + focus_window).css("backdrop-filter", "");
        $("#blur-box").css("display", "none");
        $("#blur-box").css("z-index", "-3");
        focus_window = "none";
    }, 200);
}

function edit_homework() {
    homework.innerText = homework.innerHTML.replaceAll('<br>', '\n').replaceAll('&nbsp; ', ' ').replaceAll('<strong>', '#(').replaceAll('</strong>', ')#').replaceAll('<u>', '~(').replaceAll('</u>', ')~');
    homework.contentEditable = 'true';
    $("#homework").css("columns", "auto auto");
    $("#homework").css("-webkit-columns", "auto auto");
    $("#homework").css("-moz-columns", "auto auto");
    document.getElementById("homework").focus();
    document.getElementById("homework-edit-button").onclick = apply_homework;
    document.getElementById("homework-edit-button").innerHTML = '<img src="assets/img/ok.svg" alt="Edit" /><span>完成</span>';
}

function apply_homework() {
    homework.contentEditable = 'false';
    homework.innerHTML = homework.innerText.replaceAll('\n', '<br>').replaceAll('#(', '<strong>').replaceAll(')#', '</strong>').replaceAll('~(', '<u>').replaceAll(')~', '</u>');
    $("#homework").css("columns", "auto 2");
    $("#homework").css("-webkit-columns", "auto 2");
    $("#homework").css("-moz-columns", "auto 2");
    localStorage.setItem("hlp-current-homework", homework.innerHTML)
    if (homework.innerHTML == "") {
        homework.innerHTML = "[空]";
    }
    document.getElementById("homework-edit-button").onclick = edit_homework;
    document.getElementById("homework-edit-button").innerHTML = '<img src="assets/img/edit.svg" alt="Edit" /><span>编辑</span>';
}

// function edit_monitor() {
//     document.getElementById("monitor-box").contentEditable = 'true';
//     document.getElementById("monitor-edit-button").onclick = apply_monitor;
//     document.getElementById("monitor-edit-button").innerHTML = '<img src="assets/img/ok.svg" width="16px" alt="Edit" />';
// }

// function apply_monitor() {
//     document.getElementById("monitor-box").contentEditable = 'false';
//     if (document.getElementById("monitor-box").innerHTML == "") {
//         monitorName = "Unknown";
//         document.getElementById("monitor-box").innerHTML = monitorName;
//     } else {
//         monitorName = document.getElementById("monitor-box").innerHTML;
//     }
//     localStorage.setItem("hlp-current-monitorName", monitorName);
//     document.getElementById("monitor-edit-button").onclick = edit_monitor;
//     document.getElementById("monitor-edit-button").innerHTML = '<img src="assets/img/edit.svg" width="16px" alt="Edit" />';
// }

function fullscreenEnabled() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement
    );
}

function fullscreen(element) {
    if (document.mozFullScreenEnabled) {
        return Promise.reject(new Error("[Error] 全屏模式已被禁用。请检查你的浏览器设置。"));
    }
    let result = null;
    if (element.requestFullscreen) {
        result = element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        result = element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        result = element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        result = element.webkitRequestFullScreen();
    }
    document.getElementById("full-screen-icon").setAttribute("src", "assets/img/exit_full_screen.svg");
    document.getElementById("full-screen-icon").setAttribute("onclick", "cancelFullscreen(document)");
    document.getElementById("full-screen-icon").setAttribute("title", "退出全屏");
    return result || Promise.reject(new Error("[Error] 此浏览器不支持全屏。"));
}

function cancelFullscreen(element) {
    if (element.exitFullscreen) {
        element.exitFullscreen();
    } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
    } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen();
    }
    document.getElementById("full-screen-icon").setAttribute("src", "assets/img/full_screen.svg");
    document.getElementById("full-screen-icon").setAttribute("onclick", "fullscreen(body)");
    document.getElementById("full-screen-icon").setAttribute("title", "全屏");
}

// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
// });
