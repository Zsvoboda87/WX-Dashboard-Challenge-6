

var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Cleveland,us&APPID=566806fcb1c14e56b4f2bf67f8115d7f"
// "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=566806fcb1c14e56b4f2bf67f8115d7f"

fetch(apiUrl).then(function(response) {
    response.json().then(function (data) {
        console.log(data)
    })
});

// "https://api.github.com/users/Zsvoboda87/repos"z