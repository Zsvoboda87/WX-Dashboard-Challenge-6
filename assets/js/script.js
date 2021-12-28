// query selection variables
var searchButton = document.querySelector(".search-button")
var searchButton2 = document.querySelector(".search-button2")
var cityNameInput = document.querySelector("#city-name-input")
var fiveDayParent = document.querySelector("#five-day-forecast")
var currentDayParent = document.querySelector("#current-day")

var x =0

// function to capture UI 
var getCityName = function() {
    var city = cityNameInput.value.trim();
    event.preventDefault();

    if (city) {
        getLongLat(city)
        // displayCityName(city)
        localStorage.setItem(("searchedCity" + [x]), city)
        x++;
        cityNameInput.value = "";
    } else {
        alert("Please Enter a City's Name");
    }
}

// function to get longatude and latitude data, and pass the city name
var getLongLat = function (cityName) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=566806fcb1c14e56b4f2bf67f8115d7f"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            // console.log(data)
            var name = data.name
            var lon = data.coord.lon
            var lat = data.coord.lat
            getSevenDayForecast(lon, lat, name)
        })
    });
};

// function to get 7 day wx data from open weather API
var getSevenDayForecast = function (long, lat, name) {
    var sevenDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=566806fcb1c14e56b4f2bf67f8115d7f"

    
    fetch(sevenDayURL).then(function (response) {
        response.json().then(function (data) {
            displayCurrentConditions(data, name);
            displayFiveDay(data);
        });
    });
};

// function to display the current weather in searched city
var displayCurrentConditions = function(data, name) {
    console.log(data)
    
    var iconCode = data.daily[0].weather[0].icon
    
    var currentDay = document.createElement("h3")
    currentDay.textContent = name + ": " + unixTime(data.daily[0].dt) + "  "

    var currentDayIconEl = document.createElement("div")
    currentDayIconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + ".png'/>"

    currentDay.append(currentDayIconEl)
    currentDayParent.append(currentDay); 

    var currentDayTemp = document.createElement("div")
    currentDayTemp.textContent =  "Temp:   " + Math.round(data.daily[0].temp.day) + " ºF";
    currentDayParent.append(currentDayTemp); 

    var currentDayHum = document.createElement("div")
    currentDayHum.textContent =  "Humidity:   " + data.daily[0].humidity + " %";
    currentDayParent.append(currentDayHum); 

    var currentDayWind = document.createElement("div")
    currentDayWind.textContent =  "Wind Speed:   " + data.daily[0].wind_speed + " MPH";
    currentDayParent.append(currentDayWind); 

    var currentDayUv = document.createElement("div")
    currentDayUv.textContent =  "UV Index:   " + data.daily[0].uvi;
    if (data.daily[0].uvi <= 2) {
        currentDayUv.classList.add("bg-green")
    } if (data.daily[0].uvi >2 & data.daily[0].uvi < 8) {
        currentDayUv.classList.add("bg-yellow")
    } if  (data.daily[0].uvi >=8 & data.daily[0].uvi <= 10) {
        currentDayUv.classList.add("bg-red") };

    currentDayParent.append(currentDayUv); 
};

//function to convert Unix time to read date
var unixTime = function (uts) {
    var millis = uts * 1000
    var dateObj = new Date(millis)
    var date = dateObj.toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" });
    return date
}

//function to display a 5 day forecast
var displayFiveDay = function(data) {

    for (var i =1; i < 6; i++ ) {

        //convert Unix Time to readable time
        var UTS = data.daily[i].dt
        var millis = UTS * 1000
        var dateObj = new Date(millis)
        var date = unixTime(data.daily[i].dt)
        var dayOfWeek = dateObj.toLocaleDateString("en-us", {weekday: "long"});

        //retreive icon image using icon code
        var iconCode = data.daily[i].weather[0].icon

        // create Parent Div for Card Info
        var dayEl = document.createElement("div");
        dayEl.classList = "col-12 col-lg-2 five-day-cards";

        // adds day and date info to the cards
        var weekday = document.createElement("h5");
        weekday.textContent = dayOfWeek;
        dayEl.append(weekday); 
        
        var dayDate = document.createElement("h6");
        dayDate.textContent = date;
        dayEl.append(dayDate);

        // add Icon to weather cards using icon code
        var dayIcon = document.createElement("div")
        dayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png'/>"
        dayEl.append(dayIcon);

        // add temperature, humidity, and wind speed data to each weather card
        var dayTemp = document.createElement("div");
        dayTemp.textContent = "Temp:   " + Math.round(data.daily[i].temp.day) + " ºF";
        dayEl.append(dayTemp);

        var dayHum = document.createElement("div");
        dayHum.textContent = "Humidity:  " + data.daily[i].humidity + " %";
        dayEl.append(dayHum);
        
        var dayWind = document.createElement("div");
        dayWind.textContent = "Wind:   " + Math.round(data.daily[i].wind_speed) + " MPH";
        dayEl.append(dayWind);


        // display parent card to the DOM
        fiveDayParent.append(dayEl);
    }
}

var reload = function() {
location.reload()
}

//event listeners
searchButton.addEventListener("click", getCityName);
searchButton2.addEventListener("click", reload);