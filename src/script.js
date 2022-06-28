function showCurrentDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayToday = new Date();
  let currentDay = days[dayToday.getDay()];
  let currentDate = dayToday.getDate();
  let currentMonth = months[dayToday.getMonth()];

  let dateToday = document.querySelector("h2.currentDate");
  dateToday.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;
}

showCurrentDay();

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
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${city.trim()}`;
  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector(".currentTemp");
  displayTemp.innerHTML = currentTemp;
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
  let displayTemp = document.querySelector(".currentTemp");
  displayTemp.innerHTML = locationTemp;
  let header = document.querySelector("h1");
  header.innerHTML = locationCity;
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
