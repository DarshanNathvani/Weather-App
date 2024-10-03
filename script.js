const apikey = "5505503d18623d5d3cca990533bdeb1b";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?unit=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const quoteElement = document.querySelector(".quote");

async function checkweather(city) {
    searchBtn.classList.add('loading');  // Add loading class

    const response = await fetch(apiurl + city + '&appid=' + apikey);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        quoteElement.style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Set the quote based on weather
        if (data.weather[0].main === "Clear" || data.weather[0].main === "Clouds") {
            quoteElement.innerHTML = "It's a great day for a trip!";
        } else if (data.weather[0].main === "Rain") {
            quoteElement.innerHTML = "Don't forget your umbrella!";
        } else {
            quoteElement.innerHTML = "Enjoy the weather!";
        }

        quoteElement.style.display = "block"; // Show the quote
    }

    searchBtn.classList.remove('loading');  // Remove loading class
}

searchBtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
