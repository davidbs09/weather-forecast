document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '2cf15a97939bef7b6b4111633356dc67';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    console.log(json);
});

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}