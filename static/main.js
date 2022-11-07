function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

const apiKey = 'c86c90b0ff6e32daf351bc91db636993'

let form = document.querySelector('#weatherForm');
form.addEventListener('submit', (event) => {
    clearWeather();
    event.preventDefault();
    let zipcode = event.path[0][0].value
    loadWeather(zipcode)
    form.reset()
});

const getWeather =  async (zipcode) => {
    let responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}&units=imperial`,
    { method: 'GET' });
    let dataW = await responseW.json();
    console.log(dataW)
    return dataW
}
getWeather('78023')

const getForecast =  async (zipcode) => {
    let responseF = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&appid=${apiKey}&units=imperial`,
    { method: 'GET' });
    let dataF = await responseF.json();
    console.log(dataF)
    return dataF
}
getForecast('78023')

function changeDate(unixTimestamp){
    var date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("en-US")
};

function changeTime(unixTimestamp){
    var date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString("en-US")
};

let loadWeather = async (zipcode) => {
    console.log(`<div id="${zipcode}">`)
    let dataW = await getWeather(zipcode);
    let dataF = await getForecast(zipcode);
    function forecastText(index){
        return `<p class="h5">&emsp;${changeDate(dataF.list[index].dt)} ${changeTime(dataF.list[index].dt)} - Temp: 
        ${Math.round(dataF.list[index].main.temp)}&#8457; Hum: ${dataF.list[index].main.humidity}% 
        Wind Speed: ${Math.round(dataF.list[index].wind.speed)}mph Dir:${dataF.list[index].wind.deg}&deg; 
        ${toTitleCase(dataF.list[index].weather[0].description)}&emsp;</p>`
    };
    function bgImage(desc){
        if (desc === 'broken clouds'){
            return 'bg-image0';
        } else if (desc === 'clear sky'){
            return 'bg-image1';
        } else if (desc === 'few clouds'){
            return 'bg-image2';
        } else if (desc === 'heavy intensity rain'){
            return 'bg-image3';
        } else if (desc === 'light rain'){
            return 'bg-image4';
        } else if (desc === 'light snow'){
            return 'bg-image5';
        } else if (desc === 'moderate rain'){
            return 'bg-image6';
        } else if (desc === 'overcast clouds'){
            return 'bg-image7';
        } else if (desc === 'scattered clouds'){
            return 'bg-image8';
        } else if (desc === 'snow'){
            return 'bg-image9';
        }
    };
    let new_row1 = `<div class="card-style ${bgImage(dataW.weather[0].description)} bg-opacity-50">
                        <h1 class="text-center">${dataW.name} - ${zipcode}</h1>
                            <h3 class="col">Right Now...</h3>
                        <div class="row">
                            <div class="col">
                                <h4 class="text-left">&emsp;Current Conditions: ${toTitleCase(dataW.weather[0].description)}</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-left">
                                <h4>&emsp;Today's Low: ${Math.round(dataW.main.temp_min)}&#8457;</h4>
                                <h4>&emsp;Feel's Like: ${Math.round(dataW.main.feels_like)}&#8457;</h4>
                                <h4>&emsp;Wind Speed: ${dataW.wind.speed} mph</h4>
                            </div>
                            <div class="col text-left">
                                <h4>&ensp;Current Temp: ${Math.round(dataW.main.temp)}&#8457;</h4>
                                <h4>&ensp;Humidity: ${Math.round(dataW.main.humidity)}%</h4>
                                <h4>&ensp;Wind Direction: ${dataW.wind.deg}&deg;</h4>
                            </div>
                            <div class="col text-left">
                                <h4>Today's High: ${Math.round(dataW.main.temp_max)}&#8457;</h4>
                                <h4>ATM Pressure: ${Math.round(dataW.main.pressure)} mBar</h4>
                                <h4>Cloud Coverage: ${dataW.clouds.all}%</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col text-left">
                                    <h3 class="text-left">3 Day Forcast:</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="dropdown-center mb-4 mx-4">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle button-width" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            The 24 Hours from ${changeDate(dataF.list[0].dt)} ${changeTime(dataF.list[0].dt)}
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>${forecastText(0)}</li>
                                            <li>${forecastText(1)}</li>
                                            <li>${forecastText(2)}</li>
                                            <li>${forecastText(3)}</li>
                                            <li>${forecastText(4)}</li>
                                            <li>${forecastText(5)}</li>
                                            <li>${forecastText(6)}</li>
                                            <li>${forecastText(7)}</li>
                                        </ul>
                                    </div>
                                    <div class="dropdown-center mb-4 mx-4">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle button-width button-width" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            The 24 Hours from ${changeDate(dataF.list[8].dt)} ${changeTime(dataF.list[8].dt)}
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>${forecastText(8)}</li>
                                            <li>${forecastText(9)}</li>
                                            <li>${forecastText(10)}</li>
                                            <li>${forecastText(11)}</li>
                                            <li>${forecastText(12)}</li>
                                            <li>${forecastText(13)}</li>
                                            <li>${forecastText(14)}</li>
                                            <li>${forecastText(15)}</li>
                                        </ul>
                                    </div>
                                    <div class="dropdown-center mb-4 mx-4">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle button-width" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            The 24 Hours from ${changeDate(dataF.list[16].dt)} ${changeTime(dataF.list[16].dt)}
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>${forecastText(16)}</li>
                                            <li>${forecastText(17)}</li>
                                            <li>${forecastText(18)}</li>
                                            <li>${forecastText(19)}</li>
                                            <li>${forecastText(20)}</li>
                                            <li>${forecastText(21)}</li>
                                            <li>${forecastText(22)}</li>
                                            <li>${forecastText(23)}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    document.getElementById('weatherBody').insertAdjacentHTML('beforeend', new_row1);
};

let clearWeather = () => {
    document.getElementById('weatherBody').innerHTML='';
};