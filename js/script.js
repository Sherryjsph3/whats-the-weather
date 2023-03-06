let weatherData;

const $container = $('.container');
const $search = $('.search-box button');
const $error404 = $('.not-found');
const $weatherBlock = $('.weather-block');
const $weatherDetails = $('.weather-details');

const $temperature = $('.temp');
const $feelsLike = $('.description');
const $humidity = $('.humidity span');
const $wind = $('.wind span');
const $image = $('.weather-block img');




function render() {

    $temperature.html(weatherData.main.temp + `<span>&#8457;</span>`);
    $feelsLike.text(weatherData.weather[0].description);
    $humidity.html(weatherData.main.humidity + `%`);
    $wind.html(weatherData.wind.speed + `mi/hr` )

    $weatherBlock.css("display", "");
    $weatherDetails.css("display", "");
    $weatherBlock.addClass("fadeIn");
    $weatherDetails.addClass("fadeIn");
    $container.css("height", "605px");


    if (weatherData.weather[0].main == 'Clear') {
        $image.attr("src", "../imgs/clear.png");
    } else if (weatherData.weather[0].main == 'Rain') {
        $image.attr("src", "../imgs/rain.png");
    } else if (weatherData.weather[0].main == 'Snow') {
        $image.attr("src", "../imgs/snow.png");
    } else if (weatherData.weather[0].main == 'Clouds') {
        $image.attr("src", "../imgs/cloudy.png");
    } else if (weatherData.weather[0].main == 'Haze') {
        $image.attr("src", "../imgs/haze.png");
    } else {
        $image.attr("src", "");
    }
}

function handleGetWeather(event) {
    event.preventDefault();

    let searchInfo = $('input#search').val()

    if(searchInfo == '')
        return;

    $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchInfo}&appid=94cd9592d059de58b137bde5429358af&units=imperial`
        })
        .then(
            function (data) {
                weatherData = data;
                render();
                searchInfo = "";

                console.log(data);

            },
            function (error) {
                console.log('bad request: ', error);
               
                if (error.status == 404){
                    console.log('error is 404');

                    $container.css("height", "400px");
                    $weatherBlock.css("display", "none");
                    $weatherDetails.css("display", "none");
                    $error404.css("display", "block");
                    $error404.addClass('fadeIn');
                    return;
                }

                $error404.css("display", "none");
                $error404.removeClass('fadeIn');
                
            }

        );

}

$search.on('click', handleGetWeather);