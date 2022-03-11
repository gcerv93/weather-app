const kelvinToFahr = (kelv) => {
  let temp = kelv - 273.15;
  temp *= 1.8;
  temp += 32;

  return Math.round(temp);
};

const kelvinToCelsius = (kelv) => {
  const temp = kelv - 273.15;

  return Math.round(temp);
};

// im checking the fahr attribute of data object to see what temperature format to display
const generateTempData = (obj) => {
  // if i don't initialize these here, I will start to get errors with eslint
  let res;
  let symbol;

  if (obj.fahr === true) {
    res = kelvinToFahr(obj.temp).toString();
    symbol = "\u00B0F";
  } else if (obj.fahr === false) {
    res = kelvinToCelsius(obj.temp).toString();
    symbol = "\u00b0C";
  }

  return { res, symbol };
};

// remove the main-icon element on every page load, otherwise the page will
// fill with icons
const clearMainIcon = () => {
  const iconDiv = document.querySelector(".main-icon");
  if (iconDiv) {
    iconDiv.remove();
  }
};

// change wind speed from m/s to mph
const convertWindSpeed = (obj) => {
  let { speed } = obj.wind;
  speed *= 2.2369;

  return Math.round(speed);
};

// clear main icon then display a new icon using weather-icons package by erikflowers https://github.com/erikflowers/weather-icons
// using the weather id's to find the right class for the icons
const displayIcon = (id) => {
  clearMainIcon();
  const topDiv = document.querySelector(".topDiv");
  const iconDiv = document.createElement("i");

  iconDiv.classList.add("wi");
  iconDiv.classList.add(`wi-owm-${id}`);
  iconDiv.classList.add("main-icon");
  topDiv.appendChild(iconDiv);
};

// temp values have 2 divs, temp and temp symbols
const displayTempValues = (obj) => {
  const tempDiv = document.querySelector(".tempNum");
  const tempSymbolDiv = document.querySelector(".tempSymbols");

  const tempNumData = generateTempData(obj);
  tempDiv.textContent = tempNumData.res;
  tempSymbolDiv.textContent = tempNumData.symbol;
};

const displayLocationName = (cityName) => {
  const nameDiv = document.querySelector(".cityName");
  nameDiv.textContent = cityName;
};

const displayDescription = (description) => {
  const descriptionDiv = document.querySelector(".description");
  descriptionDiv.textContent = description;
};

const feelsLikeInfo = (obj) => {
  const feelsLikeDiv = document.querySelector(".feelsLikeValue");
  const tempData = generateTempData(obj);
  feelsLikeDiv.textContent = `${tempData.res}${tempData.symbol}`;
};

const displayBottomInfo = (obj) => {
  const humidityDiv = document.querySelector(".humidityValue");
  const windSpeedDiv = document.querySelector(".windValue");

  humidityDiv.textContent = `${obj.humidity}%`;
  windSpeedDiv.textContent = `${convertWindSpeed(obj)}mph`;
  feelsLikeInfo(obj);
};

// one single function to display all data, easier to call in index.js
const displayInfo = (obj) => {
  displayDescription(obj.weather.description);
  displayTempValues(obj);
  displayLocationName(obj.name);
  displayBottomInfo(obj);
  displayIcon(obj.weather.id);
};

// function attached to symbol div listener, changes object fahr value and displays
// those particular divs again
const changeTempSymbol = (obj) => {
  if (obj.fahr === true) {
    // eslint-disable-next-line no-param-reassign
    obj.fahr = false;
  } else if (obj.fahr === false) {
    // eslint-disable-next-line no-param-reassign
    obj.fahr = true;
  }
  displayTempValues(obj);
  feelsLikeInfo(obj);
};

export { displayInfo, changeTempSymbol };
