let timerbox = document.getElementById("timer-box");
function adjust() {
    // console.log((timerbox.offsetHeight + 60) + "px");
    $("#notify-box").css("top", (timerbox.offsetHeight - 20) + "px");
    $("#notify-box").css("max-height", "100vh - " + (timerbox.offsetHeight + 20) + "px");
}
function loaded() {
    try {
        style();
    } catch (error) {
        console.log(error);
    }
    // monitorName = localStorage.getItem("hlp-current-monitorName", monitorName)
    // if (monitorName == null || monitorName == "") {
    //     monitorName = "Unknown";
    // }
    // document.getElementById("monitor").innerHTML = '今日值日班长&nbsp;<span id="monitor-box" style="color: white;">' + monitorName + '</span><button type="button" id="monitor-edit-button"><img src="assets/img/edit.svg" width="16px" alt="Edit" /></button>';
    myDate();
    $.get("themes/list.html", function (data) {
        setup_window.innerHTML = '<strong>主题选择<button onclick="hide_window()" title="返回应用">返回</button></strong>' + data;
    });
    // console.log(document.getElementById("monitor-box"));
    new EditButton(document.getElementById("monitor-edit-button"), document.getElementById("monitor-box"), "hlp-current-monitorName");
    new EditButton(document.getElementById("notice-edit-button"), document.getElementById("notice"), "hlp-notice-content");
    // setTimeout(() => document.getElementById("page-onload-box").innerHTML = "", 100);
    try {
        fadeOut(document.getElementById("page-onload-box"), 15);
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => $("#page-onload-box").css("display", "none"), 300);
    // setTimeout(() => $("#page-onload-box").css("opacity", "0"), 200);
    var display_homework = localStorage.getItem("hlp-current-homework", homework.innerHTML);
    if (display_homework == null || display_homework == "" || display_homework == "<br>") {
        document.getElementById("homework").innerHTML = "[空]";
    } else {
        document.getElementById("homework").innerHTML = localStorage.getItem("hlp-current-homework", homework.innerHTML);
    }
    // $("#blur-box").css("display", "none");
    // $("#theme-setup-window").css("display", "none");
    $.get(server_address + "/data/hlp/releases/latest/build.txt", function (data) {
        if (data > build) {
            console.log("[Info] Updates aviliable! Using the latest online live version: https://apps.xiaoxiaoci.top/data/hlp/releases/latest/live/");
            document.getElementById("info-box").innerHTML = document.getElementById("info-box").innerHTML + '&nbsp;<a href="' + server_address + '/data/hlp/releases/latest/live/" title="New version">[New live verson has been found! Click here→]</a>';
        }
    });
}
document.body.onload = setTimeout(() => loaded(), 500);
setInterval(adjust, 500);