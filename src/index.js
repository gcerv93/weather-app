import "./styles/styles.css";
import "./styles/weather-icons.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { displayInfo, changeTempSymbol } from "./DOMstuff";

// process data from the API, I only need a few things
function processData(obj) {
  const { name } = obj;
  const { temp } = obj.main;
  const { humidity } = obj.main;
  const feelsLike = obj.main.feels_like;
  const wind = { speed: obj.wind.speed };
  const weather = {
    id: obj.weather[0].id,
    description: obj.weather[0].description,
  };
  const fahr = true;

  return { name, temp, feelsLike, humidity, wind, weather, fahr };
}

async function getLocationInfo(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=89dc410fda394c8340d84dbbcc93ee59`,
    { mode: "cors" }
  );

  const result = response.json().then((res) => res);

  return result;
}

(() => {
  let data;

  // fill the display up when the page loads
  getLocationInfo("los angeles").then((result) => {
    data = processData(result);
    displayInfo(data);
  });

  // listener to change the display on a search input
  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#search");
    const searchValue = searchInput.value;

    getLocationInfo(searchValue).then((result) => {
      data = processData(result);
      displayInfo(data);
    });
  });

  // listener to change the temp displays.
  const tempSymbol = document.querySelector(".tempSymbols");
  tempSymbol.addEventListener("click", () => {
    changeTempSymbol(data);
  });
})();
