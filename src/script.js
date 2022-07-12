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
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "b742faf6701ac8c3f14958c33ae33625";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function handleSearch(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#searchForm");
  search(searchValue.value);
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Wed", "Thr", "Fri", "Sat"];

  let forecastHtml = `<div class="row">`;

  days.forEach(function (day) {
    forecastHtml +=
      // forecastHtml +
      `<div class="col">
            <div class="card">
              <div class="card-body">
                <ul class="forecast">
                  <li class="day1">${day}</li>
                  <li class="date1">03 June</li>
                  <li class="icon1"><i class="fa-solid fa-sun"></i></li>
                  <li class="temperature1">+15℃</li>
                </ul>
              </div>
            </div>
          </div>`;
  });

  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "b742faf6701ac8c3f14958c33ae33625";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city.trim()}`;
  celsiusTemp = Math.round(response.data.main.temp);

  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = currentTemp;
  let currentConditions = document.querySelector("#conditions");
  currentConditions.innerHTML = response.data.weather[0].description;
  currentConditions = currentConditions.innerHTML;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let currentTime = document.querySelector(".currentDate");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let backgroundImage = document.querySelector("#background-image");

  if (currentConditions.includes("clouds")) {
    backgroundImage.setAttribute("src", "images/cloud.svg");
  } else if (currentConditions.includes("rain", "thunderstrom")) {
    backgroundImage.setAttribute("src", "images/rain.svg");
  } else if (currentConditions.includes("rain", "thunderstrom", "drizzle")) {
    backgroundImage.setAttribute("src", "images/rain.svg");
  } else if (currentConditions.includes("snow", "sleet")) {
    backgroundImage.setAttribute("src", "images/winter.svg");
  } else if (currentConditions.includes("clear")) {
    backgroundImage.setAttribute("src", "images/sun.svg");
  } else {
    backgroundImage.setAttribute("src", "images/mist.svg");
  }

  getForecast(response.data.coord);
}

function switchToCelFahr() {
  let currentTemp = document.querySelector("#temperature");
  let celsius = document.querySelector(".celsius");
  let fahrenheit = document.querySelector(".fahren");

  if (isCelcius) {
    let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    currentTemp.innerHTML = fahrenheitTemp;
    celsius.innerHTML = "℉";
    fahrenheit.innerHTML = "℃";
    isCelcius = false;
  } else {
    currentTemp.innerHTML = celsiusTemp;
    celsius.innerHTML = "℃";
    fahrenheit.innerHTML = "℉";
    isCelcius = true;
  }
}

let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", handleSearch);
let celsiusTemp = null;

let isCelcius = true;

let degreeLink = document.querySelector("a");
degreeLink.addEventListener("click", switchToCelFahr);

search("Kyiv");

// function handlePosition(position) {
//   let laitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let apiKey = "b742faf6701ac8c3f14958c33ae33625";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${laitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//   axios.get(apiUrl).then(showLocationTemp);
// }

// function showLocationTemp(response) {
//   let locationTemp = Math.round(response.data.main.temp);
//   let locationCity = response.data.name;
//   let displayTemp = document.querySelector("#temperature");
//   displayTemp.innerHTML = locationTemp;
//   let header = document.querySelector("h1");
//   header.innerHTML = locationCity;
//   let currentConditions = document.querySelector("#conditions");
//   currentConditions.innerHTML = response.data.weather[0].main;
//   let wind = document.querySelector("#wind");
//   wind.innerHTML = Math.round(response.data.wind.speed);
//   let humidity = document.querySelector("#humidity");
//   humidity.innerHTML = Math.round(response.data.main.humidity);
// }

// function getLocation() {
//   navigator.geolocation.getCurrentPosition(handlePosition);
// }

// let button = document.querySelector("#buttonCurrentLoc");
// button.addEventListener("click", getLocation);
