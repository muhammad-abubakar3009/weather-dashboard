let cityName;
let url;
let response;
let result;
let iconCode;
let unit;

document.getElementById("searchbtn").addEventListener("click", function () {
  cityName = document.getElementById("CityInput").value;
  if (cityName.trim().length !== 0) {
    document.getElementById("status").innerHTML = "";
    getWeather(cityName);
  } else {
    document.getElementById("status").innerHTML =
      "Please Enter Valid City Name!!!";
  }
});

async function getWeather(city) {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    document.getElementById("status").innerHTML = "Loading...";
    response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    result = await response.json();
    displayWeather(result);
    document.getElementById("status").innerHTML = "";
  } catch (error) {
    document.getElementById("status").innerHTML = error.message;
    console.log(error);
  }
}

function displayWeather(result) {
  document.getElementById("CityName").innerHTML = result.name;
  document.getElementById("temperature").innerHTML = Math.round(
    result.main.temp,
  );
  unit = document.createElement("span");
  unit.innerHTML = "°C";
  document.getElementById("temperature").append(unit);
  document.getElementById("WeatherDescription").innerHTML =
    result.weather[0].description;
  iconCode = result.weather[0].icon;
  document.getElementById("WeatherIcon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
