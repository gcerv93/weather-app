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

const generateTempData = (obj) => {
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

const clearMainIcon = () => {
  const iconDiv = document.querySelector(".main-icon");
  if (iconDiv) {
    iconDiv.remove();
  }
};

const convertWindSpeed = (obj) => {
  let { speed } = obj.wind;
  speed *= 2.2369;

  return Math.round(speed);
};

const displayIcon = (obj) => {
  clearMainIcon();
  const topDiv = document.querySelector(".topDiv");
  const iconDiv = document.createElement("i");

  iconDiv.classList.add("wi");
  iconDiv.classList.add(`wi-owm-${obj.weather.id}`);
  iconDiv.classList.add("main-icon");
  topDiv.appendChild(iconDiv);
};

const displayTempValues = (obj) => {
  const tempDiv = document.querySelector(".tempNum");
  const tempSymbolDiv = document.querySelector(".tempSymbols");

  const tempNumData = generateTempData(obj);
  tempDiv.textContent = tempNumData.res;
  tempSymbolDiv.textContent = tempNumData.symbol;
};

const displayLocationName = (obj) => {
  const nameDiv = document.querySelector(".cityName");
  nameDiv.textContent = obj.name;
};

const displayDescription = (obj) => {
  const descriptionDiv = document.querySelector(".description");
  descriptionDiv.textContent = obj.weather.description;
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

const displayInfo = (obj) => {
  displayDescription(obj);
  displayTempValues(obj);
  displayLocationName(obj);
  displayBottomInfo(obj);
  displayIcon(obj);
};

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
