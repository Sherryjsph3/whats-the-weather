let weatherData;

const $weatherFor = $('#weather-for');
const $temperature = $('#temp');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');



function render() {
    $weatherFor.text(weatherData.name);
    $temperature.text(weatherData.main.temp);
    $feelsLike.text(weatherData.main.feels_like);
    $weather.text(weatherData.weather[0].description);
}

function handleGetWeather(event) {
    event.preventDefault();

    let searchInfo = $('input#search').val()
   

    $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${searchInfo}&appid=94cd9592d059de58b137bde5429358af&units=imperial`
        })
        .then(
            function (data) {
                weatherData = data;
                render();
                searchInfo = "";
            },
            function (error) {
                console.log('bad request: ', error);
            }

        );
       
}




$('form').on('submit', handleGetWeather);