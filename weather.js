document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "dd146471ce1b6f81b991c014926d70bc";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      errorMessage.textContent = "Please enter a city name.";
      errorMessage.classList.remove("hidden");
      weatherInfo.classList.add("hidden");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      const data = await response.json();

      cityNameDisplay.textContent = data.name;
      temperatureDisplay.textContent = `${data.main.temp} °C`;
      descriptionDisplay.textContent = data.weather[0].description;

      weatherInfo.classList.remove("hidden");
      errorMessage.classList.add("hidden");
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
      weatherInfo.classList.add("hidden");
    }
  });

  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      getWeatherBtn.click();
    }
  });

  cityInput.addEventListener("input", () => {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  });
});
