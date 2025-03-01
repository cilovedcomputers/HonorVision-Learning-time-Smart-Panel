function getDayString(DayNum) {
    if (DayNum == 0) {
        return "日";
    } else if (DayNum == 1) {
        return "一";
    } else if (DayNum == 2) {
        return "二";
    } else if (DayNum == 3) {
        return "三";
    } else if (DayNum == 4) {
        return "四";
    } else if (DayNum == 5) {
        return "五";
    } else if (DayNum == 6) {
        return "六";
    } else {
        return "-1";
    }
}

function myDate() {
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var day = t.getDate();
    var beginning_t = new Date(month + "/" + day + "/" + year + " 17:45:00");
    var ending_t = new Date(month + "/" + day + "/" + year + " 21:20:00");
    var progress = (t.getTime() - beginning_t.getTime()) / (ending_t.getTime() - beginning_t.getTime())
    $("#progress-line").css("width", progress * 100 + "vw");
    if (progress >= 0 && progress <= 1) {
        document.getElementById("tip").innerHTML = "<strong>自习时间，不要饥渴！</strong><br />晚自习进度：" + (Math.floor(progress * 10000)) / 100 + "%";
    } else if (progress >= -0.005 && progress < 0) {
        document.getElementById("tip").innerHTML = "<strong>晚自习即将开始</strong>";
    } else {
        document.getElementById("tip").innerHTML = "自习时间，保持安静！";
    }
    var displayTime = "";
    var hours = t.getHours();
    displayTime += hours;
    displayTime += ": ";
    var minutes = t.getMinutes();
    if (minutes < 10) {
        displayTime += "0";
    }
    displayTime += minutes;
    displayTime += ": "
    var seconds = t.getSeconds();
    if (seconds < 10) {
        displayTime += "0";
    }
    displayTime += seconds;
    document.getElementById("time-label").innerHTML = displayTime;
    if (t.getDay() == 4) {
        document.getElementById("date-label").innerHTML = year + "年" + month + "月" + day + "日" + ' 星期' + getDayString(t.getDay()) + '<span style="font-size: 12px"> (<del>疯狂版</del>)</span>';
    } else {
        document.getElementById("date-label").innerHTML = year + "年" + month + "月" + day + "日" + ' 星期' + getDayString(t.getDay());
    }
    if (hours == 21 && minutes == 20 && seconds == 0) {
        cancelFullscreen();
        const img = "/assets/img/favicon.png";
        const text = "晚自习已结束！";
        const notification = new Notification("好消息", { body: text, icon: img });
    }
}
setInterval(myDate, 1000);