

var currentDayForecast = function() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Cleveland,us&units=imperial&APPID=566806fcb1c14e56b4f2bf67f8115d7f"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data.weather[0].icon);
            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.main.humidity);

        })
    });
};

currentDayForecast();