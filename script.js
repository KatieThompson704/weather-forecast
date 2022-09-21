// replace this key with personal weather API Key
var apiKey = "d11e35bdec95037b6ad5269d9f22a4ae";
// URL address of this endpoint;
function getGeoLocation(city) {
  //   reminder: promise = .then
  var geoURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" +
    apiKey;
  console.log(city);
  fetch(geoURL)
    .then(function (geoData) {
      return geoData.json();
    })
    .then(function (geoData2) {
      console.log(geoData2);
      var lat = geoData2[0].lat;
      var lon = geoData2[0].lon;
      var name = geoData2[0].name;
      getWeather(lat, lon, name);
    });
}
function getWeather(lat, lon, name) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      displayWeather(weatherData);
    });
}
function displayWeather(weatherData) {
  console.log(weatherData);
  $("#weather-main").empty();
  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body");
  var cityNameEl = $("<h2>").addClass("card-title").text(weatherData.name);
  var tempEl = $("<h4>")
    .addClass("card-text")
    .text("Temperature: " + weatherData.main.temp);
  var iconURL = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  var iconEl = $("<img>").attr("src", iconURL);

  $("#weather-main").append(
    card.append(cardBody.append(cityNameEl.append(iconEl), tempEl))
  );
  getFiveDayForecast(weatherData.coord.lat, weatherData.coord.lon);
}

function getFiveDayForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i++) {
        console.log(data.list[i].dt_txt.split(" ")[1]);
        var forecastTime = data.list[i].dt_txt.split(" ")[1];
        // if (forecastTime === "12:00:00") {
        //     console.log()
        // }
        var targetArray = data.list.filter(
          (weatherObject) => weatherObject.dt_txt.split(" ")[1] == "12:00:00"
        );
        console.log(targetArray);
      }
    });
}
$("#srch-btn").on("click", function () {
  var cityName = $("#city-name").val();
  getGeoLocation(cityName);
  console.log(cityName);
});
