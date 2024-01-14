const city = document.getElementById("city");
const temp = document.getElementById("temperature");
const weather = document.getElementById("weather");
const lowHigh = document.getElementById("low-high");
const date = document.getElementById("date");

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cityName = e.target.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        city.innerText = `${data.name}, ${data.sys.country}`;
        temp.innerText = `${parseInt(data.main.temp)}°C`;
        const weatherDescription = data.weather.map((w) => w.main);
        weather.innerText = weatherDescription.join(",");
        lowHigh.innerText = `${parseInt(data.main.temp_min)}°C / ${parseInt(
          data.main.temp_max
        )}°C`;
        const todayDate = new Date();
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const formattedDate = formatter.format(todayDate);
        date.innerText = formattedDate;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
