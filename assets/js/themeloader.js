function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substring(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'assets/js/AdjustLayout.js';
document.getElementsByTagName('head')[0].appendChild(script);
var theme_name = "default";
if (GetQueryString("theme") == null || GetQueryString("theme") == "0" || GetQueryString("theme") == "") {
    if (localStorage.getItem("hlp-theme-setting") != null && localStorage.getItem("hlp-theme-setting") != "0" && localStorage.getItem("hlp-theme-setting") != "") {
        theme_name = localStorage.getItem("hlp-theme-setting");
    } else {
        theme_name = "default";
    }
} else {
    theme_name = GetQueryString("theme");
}
function style() {
    fetch("./themes/" + theme_name + "/config.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("background-box").innerHTML = data.style.background;
            $("body").css("font-family", data.style.font_family);
            $("#navbar").css("background-color", data.style.background_color.navbar);
            $(".notify").css("background-color", data.style.background_color.notify);
            $("#homework-edit-button").css("background-color", data.style.background_color.buttons.default);
            $("#monitor-edit-button").css("background-color", data.style.background_color.buttons.default);
            document.getElementById("homework-edit-button").addEventListener("mouseover", function () {
                $("#homework-edit-button").css("background-color", data.style.background_color.buttons.mouseover);
            });
            document.getElementById("homework-edit-button").addEventListener("mouseout", function () {
                $("#homework-edit-button").css("background-color", data.style.background_color.buttons.default);
            });
            document.getElementById("monitor-edit-button").addEventListener("mouseover", function () {
                $("#monitor-edit-button").css("background-color", data.style.background_color.buttons.mouseover);
            });
            document.getElementById("monitor-edit-button").addEventListener("mouseout", function () {
                $("#monitor-edit-button").css("background-color", data.style.background_color.buttons.default);
            });
            document.getElementById("notice-edit-button").addEventListener("mouseover", function () {
                $("#notice-edit-button").css("background-color", data.style.background_color.buttons.mouseover);
            });
            document.getElementById("notice-edit-button").addEventListener("mouseout", function () {
                $("#notice-edit-button").css("background-color", data.style.background_color.buttons.default);
            });
        });
    document.getElementById("info-box").innerHTML = version + ".theme." + theme_name;
    localStorage.setItem("hlp-theme-setting", theme_name);
}
