import "./styles.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

async function getLocationInfo(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=89dc410fda394c8340d84dbbcc93ee59`,
    { mode: "cors" }
  );

  response.json().then((res) => {
    console.log(res);
  });
}
