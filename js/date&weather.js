// 获取日期、时间和天气数据并更新页面元素
function updateDateTime() {
  // 获取当前日期和时间
  var currentDateTime = new Date();

  // 获取年、月、日
  var year = currentDateTime.getFullYear();
  var month = currentDateTime.getMonth() + 1; // 注意月份从0开始，因此需要加1
  var day = currentDateTime.getDate();

  // 更新日期显示
  var dateElement = document.getElementById('date');
  dateElement.innerHTML = '' + year + ' 年 ' + month + ' 月 ' + day + ' 日 ';//日期

  // 获取时间
  var time = currentDateTime.toLocaleTimeString();

  // 更新时间显示
  var timeElement = document.getElementById('time');
  timeElement.innerHTML = '' + time;//时间

  // 获取天气数据（示例：使用一个天气API，你需要替换成你自己的API）
  var weatherAPI = 'https://your-weather-api.com';
  fetch(weatherAPI)
    .then(response => response.json())
    .then(data => {
      // 解析天气数据并更新页面元素
      var weatherElement = document.getElementById('weather');
      weatherElement.innerHTML = '天气：' + data.weather;
    });
}

// 定时更新日期、时间和天气（每秒钟更新一次）
setInterval(updateDateTime, 1000);
