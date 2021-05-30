const APIKEY = "2bfdff62d10ac09bcbd6648dcb41e523";

const getWeather = () => {
  fetch(APICALL)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(JSON.stringify(myJson));
    });
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const APICALL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}&lang=kr&exclude=minutely,hourly,alerts`;
    // http://api.openweathermap.org/geo/1.0/reverse?${lat}&lon=${lon}&limit=5&appid=${APIKEY}
    const GEOAPICALL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKEY}`;
    fetch(GEOAPICALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
    fetch(APICALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  });
};

function init() {
  getLocation();
}

init();
