const elements = {
  container: document.querySelector('.container'),
  search: document.querySelector('.search-box button'),
  weatherBox: document.querySelector('.weather-box'),
  weatherDetails: document.querySelector('.weather-details'),
  error404: document.querySelector('.not-found')
};

elements.search.addEventListener('click', () => {
  const APIKey = 'c19815d5656b0b2cfd81cd7aed4274f7';
  const cityInput = document.querySelector('.search-box input');
  const city = cityInput.value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(handleWeatherData)
    .catch(handleError);
});

function handleWeatherData(json) {
  if (json.cod === '404') {
    handleNotFound();
    return;
  }

  elements.error404.style.display = 'none';
  elements.error404.classList.remove('fadeIn');

  const { weatherBox, weatherDetails, container } = elements;

  const image = weatherBox.querySelector('img');
  const temperature = weatherBox.querySelector('.temperature');
  const description = weatherBox.querySelector('.description');
  const humidity = weatherDetails.querySelector('.humidity span');
  const wind = weatherDetails.querySelector('.wind span');
  const visibility = weatherDetails.querySelector('.visibility span');

  updateImageSrc(image, json.weather[0].main);
  const celsiusTemperature = parseInt(json.main.temp);
  const fahrenheitTemperature = celsiusToFahrenheit(celsiusTemperature);
  temperature.innerHTML = `${fahrenheitTemperature.toFixed(0)}<span>°F</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  const formattedVisibility = formatVisibility(json.visibility);
  visibility.innerHTML = `${formattedVisibility} km`;



  displayWeatherInfo();
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function formatVisibility(visibility) {
    if (visibility >= 1000) {
        return (visibility / 1000).toFixed(1) + 'k';
    } else {
        return visibility.toString();
    }
}

function handleError(error) {
  console.error('Error fetching weather data:', error);
  alert('An error occurred while fetching weather data. Please try again.');
}

function handleNotFound() {
  const { container, weatherBox, weatherDetails, error404 } = elements;

  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
}

function updateImageSrc(image, weatherCondition) {
  const images = {
    'Clear': 'images/clear.png',
    'Rain': 'images/rain.png',
    'Snow': 'images/snow.png',
    'Clouds': 'images/cloud.png',
    'Haze': 'images/mist.png'
  };

  image.src = images[weatherCondition] || '';
}

function displayWeatherInfo() {
  const { weatherBox, weatherDetails, container } = elements;

  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  weatherBox.classList.add('fadeIn');
  weatherDetails.classList.add('fadeIn');
  container.style.height = '590px';
}
