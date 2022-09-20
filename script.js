// replace this key with personal weather API Key
var apiKey = "45ebbd33aab5c77a18994061b0a6ee6a";
// URL address of this endpoint;
function getGeoLocation(city) {
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
      console.log(weatherData);
    });
}
$("#srch-btn").on("click", function () {
  var cityName = $("#city-name").val();
  getGeoLocation(cityName);
  console.log(cityName);
});
