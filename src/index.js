import "./styles.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

function processData(obj) {
  const { temp } = obj.main;
  const { humidity } = obj.main;
  const wind = { windspeed: obj.wind.speed, windDegrees: obj.wind.deg };
  const weather = {
    id: obj.weather[0].id,
    main: obj.weather[0].main,
    description: obj.weather[0].description,
  };

  return { temp, humidity, wind, weather };
}

async function getLocationInfo(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=89dc410fda394c8340d84dbbcc93ee59`,
    { mode: "cors" }
  );

  response.json().then((res) => {
    console.log(res);
    console.log(processData(res));
  });
}

getLocationInfo("Houston");
