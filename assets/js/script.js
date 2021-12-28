var searchButton = document.querySelector(".search-button")

var getCityName = function() {
    console.log("test")
}

var getLongLat = function (cityName) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=566806fcb1c14e56b4f2bf67f8115d7f"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            var lon = data.coord.lon
            var lat = data.coord.lat
            getSevenDayForecast(lon, lat)
        })
    });
};


var getSevenDayForecast = function (long, lat) {
    var sevenDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=566806fcb1c14e56b4f2bf67f8115d7f"

    fetch(sevenDayURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
        });
    });
};

searchButton.addEventListener("click", getCityName);
