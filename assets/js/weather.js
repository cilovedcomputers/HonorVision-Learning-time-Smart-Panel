var weather_station_id = "ZZNyr";
var weather_tmp = "--";
var weather_feelst = "--";
var weather_info = "--";
var weather_humidity = "--";
var weather_wind = "--";
var weather_issue = "";
var weather_station = "--";
var weather_lastupdtime = "--";
function get_weather() {
    fetch("http://www.nmc.cn/rest/weather?stationid=" + weather_station_id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // weather = JSON.parse(data);
            // console.log(data.data.real.weather.temperature);
            if (data.msg == "success" && data.data != "") {
                weather_tmp = data.data.real.weather.temperature;
                weather_feelst = data.data.real.weather.feelst;
                weather_info = data.data.real.weather.info;
                weather_humidity = data.data.real.weather.humidity;
                weather_wind = (data.data.real.wind.direct + " " + data.data.real.wind.power).replaceAll("9999", "微风");
                weather_station = data.data.real.station.city + "市";
                if (data.data.real.warn.alert != "9999") {
                    weather_issue = ('<br /><a target="_blank" title="详细信息" style="color: ToColor(' + data.data.real.warn.signallevel + ');" href="http://www.nmc.cn' + data.data.real.warn.url + '">⚠&nbsp;' + data.data.real.warn.signaltype + data.data.real.warn.signallevel + "预警</a>").replaceAll("ToColor(蓝色)", "blue").replaceAll("ToColor(黄色)", "yellow").replaceAll("ToColor(橙色)", "orange").replaceAll("ToColor(红色)", "red");
                } else {
                    weather_issue = "";
                }
                weather_lastupdtime = data.data.real.publish_time;
            } else {
                weather_tmp = "--";
                weather_feelst = "--";
                weather_info = "--";
                weather_humidity = "--";
                weather_wind = "--";
                weather_issue = "";
                weather_station = "--";
                weather_lastupdtime = "--";
            }
        });
}
function refresh_display() {
    document.getElementById("notify-weather").innerHTML = "<h5>" + weather_station + "天气</h5>" + weather_info + "&nbsp;" + weather_tmp + "℃ (体感 " + weather_feelst + "℃)<br />相对湿度：" + weather_humidity + "%<br />风向：" + weather_wind + weather_issue + '<br /><span style="margin: 0; color: rgba(196, 196, 196, 0.8); font-size: 16px; line-height: 14px">Last Update: ' + weather_lastupdtime + '</span>';
    if (weather_info != "晴" && weather_info != "多云" && weather_info != "--") {
        // document.getElementById("notify-debug1").setAttribute("style", "background-color: rgba(165, 165, 165, 0.267);");
        $("#notify-debug1").css("background-color", "rgba(195, 195, 195, 0.15)");
    } else {
        $("#notify-debug1").css("background-color", "rgba(253, 255, 106, 0.15)");
    }
}
setTimeout(() => get_weather(), 500);
setInterval(get_weather, 300000);
setInterval(refresh_display, 1000);