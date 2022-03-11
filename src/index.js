import "./styles/styles.css";
import "./styles/weather-icons.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import displayInfo from "./DOMstuff";

function processData(obj) {
  const { name } = obj;
  const { temp } = obj.main;
  const { humidity } = obj.main;
  const feelsLike = obj.main.feels_like;
  const wind = { speed: obj.wind.speed, degrees: obj.wind.deg };
  const weather = {
    id: obj.weather[0].id,
    main: obj.weather[0].main,
    description: obj.weather[0].description,
  };

  return { name, temp, feelsLike, humidity, wind, weather };
}

async function getLocationInfo(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=89dc410fda394c8340d84dbbcc93ee59`,
    { mode: "cors" }
  );

  const result = response.json().then((res) => res);

  return result;
}

getLocationInfo("Houston").then((result) => {
  const data = processData(result);
  data.fahr = true;
  displayInfo(data);
});

(() => {
  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#search");
    const searchValue = searchInput.value;
    getLocationInfo(searchValue).then((result) => {
      console.log(processData(result));
      // fillTempValues(processData(result));
    });
  });
})();
