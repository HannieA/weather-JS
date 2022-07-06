function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `${day}, 0${hours}:${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `${day}, ${hours}:0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function showCity(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#searchForm");

  let apiKey = "b742faf6701ac8c3f14958c33ae33625";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", showCity);

function showTemp(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city.trim()}`;
  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = currentTemp;
  let currentConditions = document.querySelector("#conditions");
  currentConditions.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let currentTime = document.querySelector(".currentDate");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let backgroundImage = document.querySelector("#background-image");
  backgroundImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
}

function handlePosition(position) {
  let laitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b742faf6701ac8c3f14958c33ae33625";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${laitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocationTemp);
}

function showLocationTemp(response) {
  let locationTemp = Math.round(response.data.main.temp);
  let locationCity = response.data.name;
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = locationTemp;
  let header = document.querySelector("h1");
  header.innerHTML = locationCity;
  let currentConditions = document.querySelector("#conditions");
  currentConditions.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#buttonCurrentLoc");
button.addEventListener("click", getLocation);

// let isCelcius = true;

// function switchToCelFahr() {
//   let currentTemp = document.querySelector(".currentTemp");
//   let celsius = document.querySelector(".celsius");
//   let fahrenheit = document.querySelector(".fahren");

//   if (isCelcius) {
//     currentTemp.innerHTML = Math.round(73.4);
//     celsius.innerHTML = "℉";
//     fahrenheit.innerHTML = "℃";
//     isCelcius = false;
//   } else {
//     currentTemp.innerHTML = 23;
//     celsius.innerHTML = "℃";
//     fahrenheit.innerHTML = "℉";
//     isCelcius = true;
//   }
// }

// let degreeLink = document.querySelector("a");
// degreeLink.addEventListener("click", switchToCelFahr);
