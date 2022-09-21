//  personal weather API Key
var apiKey = "d11e35bdec95037b6ad5269d9f22a4ae";
// URL address of this endpoint;
function getGeoLocation(city) {
  //   reminder: promise = .then
  var geoURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" +
    apiKey;
  console.log(city);
  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      var name = data[0].name;
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
    .text("Temperature: " + weatherData.main.temp + " F");
  var humidityEl = $("<h4>")
    .addClass("card-text")
    .text("Humidity: " + weatherData.main.humidity + " %");
  var windSpeedEl = $("<h4>")
    .addClass("card-text")
    .text("Wind: " + weatherData.wind.speed + " MPH");
  var iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  var iconEl = $("<img>").attr("src", iconURL);

  $("#weather-main").append(
    card.append(
      cardBody.append(
        cityNameEl.append(iconEl),
        tempEl,
        humidityEl,
        windSpeedEl
      )
    )
  );
  getFiveDayForecast(weatherData.coord.lat, weatherData.coord.lon);
}

function getFiveDayForecast(lat, lon) {
  $("#five-day-weather").empty();
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var targetArray = data.list.filter(
        (weatherObject) => weatherObject.dt_txt.split(" ")[1] == "12:00:00"
      );
      console.log(targetArray);
      for (var i = 0; i < targetArray.length; i++) {
        // console.log(data.list[i].dt_txt.split(" ")[1]);
        var forecastTemp = targetArray[i].main.temp;
        console.log(forecastTemp);
        var forecastHumidity = targetArray[i].main.humidity;
        console.log(forecastHumidity);
        var forecastWindSpeed = targetArray[i].wind.speed;
        console.log(forecastWindSpeed);
        var forecastDate = targetArray[i].dt_txt.split(" ")[0];
        console.log(forecastDate);
        var fiveDayDateEl = $("<h3>")
          .addClass("card-text")
          .text("Date: " + forecastDate);
        var iconURL = `https://openweathermap.org/img/wn/${targetArray[i].weather[0].icon}@2x.png`;
        var iconEl = $("<img>").attr("src", iconURL);
        var fiveDayTempEl = $("<h4>")
          .addClass("card-text")
          .text("Temperature: " + forecastTemp + " F");
        var fiveDayHumidityEl = $("<h4>")
          .addClass("card-text")
          .text("Humidity: " + forecastHumidity + " %");
        var fiveDayWindSpeedEl = $("<h4>")
          .addClass("card-text")
          .text("Wind: " + forecastWindSpeed + " MPH");
        var card = $("<div>").addClass("col");
        var cardBody = $("<div>").addClass("card forecast-cards");
        $("#five-day-weather").append(
          card.append(
            cardBody.append(
              fiveDayDateEl,
              iconEl,
              fiveDayTempEl,
              fiveDayHumidityEl,
              fiveDayWindSpeedEl
            )
          )
        );
      }
    });
}

function storeCitySearch(cityName) {
  var citySearch = {
    city: cityName,
  };
  var cityList = JSON.parse(localStorage.getItem("citySearch"));
  var arrayOfCities = [];
  if (cityList) {
    cityList.forEach(function (item) {
      arrayOfCities.push(item);
    });
    arrayOfCities.push(citySearch);
    localStoarge.setItem("citySearch", JSON.stringify(arrayOfCities));
  } else {
    arrayOfCities.push(citySearch);
    localStoarge.setItem("citySearch", JSON.stringify(arrayOfCities));
  }

  for (var i = 0; i < arrayOfCities.length; i++) {
    var searchedCityEl = $("<div>").addClass("card").text(arrayOfCities[i]);
    $("#srch-cities").append(searchedCityEl);
  }
}

$("#srch-btn").on("click", function () {
  var cityName = $("#city-name").val();
  getGeoLocation(cityName);
  storeCitySeach(cityName);
});
