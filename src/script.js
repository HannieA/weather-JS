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
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function handleSearch(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#searchForm");
  search(searchValue.value);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHtml += `<div class="col">
            <div class="card">
              <div class="card-body">
                <ul class="forecast">
                  <li class="day-forecast">${formatForecastDay(
                    forecast.dt
                  )}</li>
                  <li> <img class="icon-forecast" src=https://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png < /></li>
                  <li class="temperature-max"> <span> ${Math.round(
                    forecast.temp.max
                  )}</span>° | <span class="temperature-min">${Math.round(
        forecast.temp.min
      )}</span>° </li>
                </ul>
              </div>
            </div>
          </div>`;
    }
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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", handleSearch);

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
