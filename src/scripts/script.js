document.querySelector('#db9-search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#db9-city_name').value;

    if (!cityName) {
        document.querySelector("#db9-weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '2cf15a97939bef7b6b4111633356dc67';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#db9-weather").classList.remove('show');
        showAlert(`Cidade não encontrada...

            <img src="src/img/notFound.svg" alt="Cidade não encontrada">
            `);
    };
});

function showInfo(json){
    showAlert('');

    document.querySelector("#db9-weather").classList.add('show');

    document.querySelector('#db9-title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#db9-temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#db9-temp_description').innerHTML = `${json.description}`;
    document.querySelector('#db9-temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#db9-temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#db9-temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#db9-humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#db9-wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#db9-alert').innerHTML = msg;
}