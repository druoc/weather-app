const key = '7b796ab33772d45b7c8796f1f19b0a7c';//API access key
const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    details.innerHTML = '<h1>Loading...</h1>';
    const location = e.target.location.value;
    weatherApp(location);
});

async function weatherApp(location) {
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location) {
    const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data);
    return data;
}

function generateHTML(data) {
    const html = `
    <h1 class="temp">${data.current.temperature}°c</h1>
    <h1 class="status">${data.current.weather_descriptions.map(item => item).join(' ')}</h1>
    <div class="more-info">
    <p>Location - ${data.location.name}, ${data.location.country}</p>
    <p>Feels like: ${data.current.feelslike}°c</p>
    <p>Humidity - ${data.current.humidity}%</p>
    <p>Wind speed - ${data.current.wind_speed}km/h</p>
    <p>Wind direction - ${data.current.wind_dir}</p>
   
    </div>
    `;
    details.innerHTML = html;

}