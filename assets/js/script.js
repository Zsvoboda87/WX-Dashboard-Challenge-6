var searchButton = document.querySelector(".search-button")
var cityNameInput = document.querySelector("#city-name-input")
var fiveDayParent = document.querySelector("#five-day-forecast")


var getCityName = function() {
    var city = cityNameInput.value.trim();
    event.preventDefault();

    if (city) {
        getLongLat(city)
        cityNameInput.value = "";
    } else {
        alert("Please Enter a City's Name");
    }
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
            displayFiveDay(data)
        });
    });
};

var displayFiveDay = function(data) {
    console.log(data)
    for (var i =1; i < 6; i++ ) {

        //convert Unix Time to readable time
        var UTS = data.daily[i].dt
        var millis = UTS * 1000
        var dateObj = new Date(millis)
        var date = dateObj.toLocaleDateString("en-us", {month: "short", day: "numeric", year: "numeric"});
        var dayOfWeek = dateObj.toLocaleDateString("en-us", {weekday: "long"});

        

        // create Parent Div for Card Info
        var dayEl = document.createElement("div");
        dayEl.classList = "col-2 five-day-cards";

        // each block adds specific info to the card
        var weekday = document.createElement("h5");
        weekday.textContent = dayOfWeek;
        dayEl.append(weekday); 
        
        var dayDate = document.createElement("h6");
        dayDate.textContent = date;
        dayEl.append(dayDate);
        
        // var dayDate = document.createElement("h6");
        // dayDate.textContent = fetch("http://openweathermap.org/img/wn/10d@2x.png");
        // dayEl.append(dayDate);

        var dayTemp = document.createElement("div");
        dayTemp.textContent = "Temp:   " + data.daily[i].temp.day + " ºF";
        dayEl.append(dayTemp);

        var dayHum = document.createElement("div");
        dayHum.textContent = "Humidity:  " + data.daily[i].humidity + " %";
        dayEl.append(dayHum);
        
        var dayWind = document.createElement("div");
        dayWind.textContent = "Wind:   " + data.daily[i].wind_speed + " MPH";
        dayEl.append(dayWind);


        // display parent card to the DOM
        fiveDayParent.append(dayEl);
    }
}

searchButton.addEventListener("click", getCityName);
