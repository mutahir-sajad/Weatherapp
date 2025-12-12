/* ---- Your JS, NOT MODIFIED ---- */

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const detectBtn = document.getElementById('detectBtn');

const locationElem = document.getElementById('location');
const descElem = document.getElementById('description');
const tempElem = document.getElementById('temp');
const iconElem = document.getElementById('weatherIcon');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const pressureElem = document.getElementById('pressure');

const dailyForecastElem = document.getElementById('dailyForecast');
const hourlyChartCanvas = document.getElementById('hourlyChart');

/* your functions like geocodeCity(), fetchWeatherByLatLon(), detectLocationAndLoad(), etc. remain here */

/* Your pasted ending JS code starts here */

searchBtn.addEventListener('click', async () => { 
    const q = searchInput.value.trim(); 
    if (!q) { 
        alert('Enter city name or allow detection'); 
        return; 
    } 
    
    searchBtn.disabled = true; 
    
    try { 
        const results = await geocodeCity(q); 
        if (!results.length) { 
            alert('Location not found'); 
            return; 
        } 
        
        const place = results[0]; 
        
        searchInput.value = `${place.name}, ${place.country}`; 
        
        await fetchWeatherByLatLon(
            place.latitude,
            place.longitude,
            `${place.name}`,
            `${place.country}`
        ); 
        
    } catch (e){ 
        console.error(e); 
        alert('Search failed'); 
    } finally { 
        searchBtn.disabled = false; 
    } 
});

detectBtn.addEventListener('click', detectLocationAndLoad);

searchInput.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') searchBtn.click();
});

window.addEventListener('load', () => {
    detectLocationAndLoad();
});

function getWeatherDescription(weathercode){
    switch(weathercode){
        case 0: return 'Clear sky';
        case 1: 
        case 2: 
        case 3: return 'Mainly clear / cloudy';
        case 45: 
        case 48: return 'Fog';
        case 51: 
        case 53: 
        case 55: return 'Drizzle';
        case 56: 
        case 57: return 'Freezing drizzle';
        case 61: 
        case 63: 
        case 65: return 'Rain';
        case 66: 
        case 67: return 'Freezing rain';
        case 71: 
        case 73: 
        case 75: return 'Snow';
        case 77: return 'Snow grains';
        case 80: 
        case 81: 
        case 82: return 'Rain showers';
        case 85: 
        case 86: return 'Snow showers';
        case 95: 
        case 96: 
        case 99: return 'Thunderstorm';
        default: return 'Unknown';
    }
}
