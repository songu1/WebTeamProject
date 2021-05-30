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
        const city = document.getElementsByName("city");
        const cityName = myJson[0].name;
        city[0].innerHTML = cityName;
        city[1].innerHTML = cityName;
        city[2].innerHTML = cityName;
      });
    fetch(APICALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        for (let i = 0; i < 3; i++) {
          const date = document.getElementById("date" + i);
          const day = document.getElementById("day" + i);
          const temp = document.getElementById("temp" + i);
          const weather = document.getElementById("weather" + i);

          const timestamp = myJson.daily[i].dt * 1000;
          const tempDate = new Date(timestamp);

          date.innerText =
            tempDate.getFullYear() +
            "-" +
            (tempDate.getMonth() + 1) +
            "-" +
            tempDate.getDate();
          day.innerText = tempDate.getDay();
          temp.innerText = myJson.daily[i].temp.day;
          weather.innerText = myJson.daily[i].weather[0].main;
        }
      });
  });
};

const init = () => {
  getLocation();
};

init();
