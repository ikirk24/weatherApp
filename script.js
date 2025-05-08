

const getWeather = async () => {

    const weatherLocation = document.getElementById('weatherLocation').value;
    const locationName = document.getElementById('locationName');
    const weatherDescription = document.getElementById('weatherDescription');
    const windSpeed = document.getElementById('windSpeed');
    const humidityPercentage = document.getElementById('humidityPercentage');
    const weatherImage = document.getElementById('weatherImage');
    const weatherBox = document.getElementById('weatherBox');
    const descriptionBox = document.getElementById('descriptionBox');

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=a8412ea49f0a4b3a9f4174457250705&q=${weatherLocation}`
    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Could not fetch resource")
        } 
        
        const data = await response.json();

        
        console.log(data)

        weatherBox.style.display = "flex";
        descriptionBox.style.display = "flex";

        if (data.location.country === 'United States of America'){
        locationName.textContent = `${data.location.name}, ${data.location.region}`;
        } else {
            locationName.textContent = `${data.location.name}, ${data.location.country}`;
        }

        weatherDescription.textContent = `${data.current.condition.text} ${data.current.temp_f}℉ `;
        windSpeed.textContent = `${data.current.wind_mph} mph`;
        humidityPercentage.textContent = `${data.current.humidity}%`;

        // weatherImage.src = '';

        if (data.current.condition.text.toLowerCase() == 'partly cloudy') {
            weatherImage.src = 'Photos/partly-cloudy.png'
        } else if ((data.current.condition.text.toLowerCase() == 'cloudy') || (data.current.condition.text.toLowerCase() == 'overcast')){
            weatherImage.src = 'Photos/clouds.png'
        } else if ((data.current.condition.text.toLowerCase() == 'sunny') || (data.current.condition.text.toLowerCase() == 'clear')) {
            weatherImage.src = 'Photos/sun.png'
        } else if ((data.current.condition.text.toLowerCase() == 'rainy') || (data.current.condition.text.toLowerCase().includes = 'rain')){
            weatherImage.src = 'Photos/rain.png'
        } else if (data.current.condition.text.toLowerCase() == 'snowy')  {
            weatherImage.src = 'Photos/snow.png'
        } else if (data.current.condition.text.toLowerCase().includes ='thunder')  {
            weatherImage.src = 'Photos/thunder.png'
        } 

        console.log(data.current.condition.text.toLowerCase());
    }
    catch (error) {
        console.error(error);
        weatherBox.style.display = "none";
        descriptionBox.style.display = "flex";
        locationName.textContent = '';
        weatherDescription.textContent = '';
        weatherImage.src = 'Photos/218954-P1070Y-526.jpg'

    }
}


window.addEventListener('keypress', (e) => {
    if (e.key === "Enter"){
        getWeather();
    }
})