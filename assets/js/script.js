

var getLongLat = function() {
                        
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Cleveland&units=imperial&APPID=566806fcb1c14e56b4f2bf67f8115d7f"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            var lon = data.coord.lon
            var lat = data.coord.lat
            getSevenDayForecast(lon, lat)
        })
    });
};

getLongLat();

var getSevenDayForecast = function(long, lat) {
    console.log(long, lat)
}


// http://api.openweathermap.org/data/2.5/forecast?q=Cleveland&appid=units=imperial&APPID=566806fcb1c14e56b4f2bf67f8115d7f

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&exclude=minutely,hourly&appid=566806fcb1c14e56b4f2bf67f8115d7f