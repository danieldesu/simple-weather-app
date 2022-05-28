// App.js for DOM manipulation, forecast.js for API interaction

const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `<h5>${cityDetails.EnglishName}</h5>
<div>${weather.WeatherText}</div>

<div><span>${weather.Temperature.Metric.Value}</span><span</span>&deg;C</span></div>`;

  // Handling night/day time and icon img changes

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  let timeAlt = weather.IsDayTime ? "daytime" : "nighttime";

  time.setAttribute("src", timeSrc);
  time.setAttribute("alt", timeAlt);

  //remove display none class once you make a search, .card is hidden at start

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //grabbing input field named city from cityForm div
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update UI
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // Local storage save and auto check
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
