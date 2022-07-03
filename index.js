let speedUnit = document.querySelector('#speed-unit').textContent;

let searchContainer = document.querySelector('.search-container');

let degUnit = document.querySelector('#deg-unit').textContent;

async function fetchWeatherData(location,unit){
    
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d3d8dbadb22b5dd9d1b4bce447710653&units=${unit}`,{mode: 'cors'});

    const json = await response.json();

    const icon = await fetch(`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

    weatherObject(json,icon);

    }catch{

        alert('There was an error');
    }
}


const weatherObject = function(json,icon){

    const weatherDescription = json.weather[0].description;

    const tempMain = json.main.temp;

    const feelsLike = json.main.feels_like;

    const humidity = json.main.humidity;

    const windSpeed = json.wind.speed;

    const windDirection = json.wind.deg;

    const iconUrl = icon.url;

    const city =  json.name;

    const country = json.sys.country;

    displayContent.displayMain(tempMain,city,country,iconUrl,weatherDescription);

    displayContent.displayFeelsLike(feelsLike,humidity);

    displayContent.displayWind(windSpeed,windDirection);

}

const displayContent = function(){

    const displayMain=function(degree,city,country,img,desc){

        let temp = document.querySelector('#temp');
        let cityCountry = document.querySelector('#place');
        let icon = document.querySelector('img');
        let tempDesc = document.querySelector('#temp-desc');

        temp.textContent=`${degree} ${degUnit}`;

        icon.src =`${img}`;

        cityCountry.textContent = `${city}, ${country}`;

        tempDesc.textContent= `${desc}`;
    }

    const displayFeelsLike = function(feelsLike,humidity){

        let feelsLikeText = document.querySelector('#feels-like');

        let humid = document.querySelector('#humidity');

        feelsLikeText.textContent = `Feels like ${feelsLike} ${degUnit}`;

        humid.textContent = `Humidity: ${humidity}%`;

    }

    const displayWind = function(windSpeed,windDirection){

        let speedText = document.querySelector('#speed');

        let directionText = document.querySelector('#direction');

        speedText.textContent = `Wind speed: ${windSpeed} ${speedUnit}`;

        directionText.textContent = `Wind direction: ${windDirection}`;


    }

    return{displayMain,displayFeelsLike,displayWind};
}();

const interpertData = function(){

    let unit='metric';

    let searchContainer = document.querySelector('.search-container');

    let input = document.querySelector('input');

    let trigger = document.querySelector('.toggle-container');

    let toggle = document.querySelector('.toggle');

    const toggleUnit = function(){

        if(unit==='metric'){

            unit='imperial';
            speedUnit='m/h';
            degUnit='°F';
            toggle.style.transform='translateX(100%)';
        }else{
            unit='metric';
            speedUnit='m/s';
            degUnit='°C';
            toggle.style.transform='translateX(0)';
        }

    }
    
    trigger.addEventListener('click',function(){

        let placeName = document.querySelector('#place').textContent;

        toggleUnit();

        fetchWeatherData(placeName,unit);

    })


    searchContainer.addEventListener('click',(e)=>{

        if(e.target.matches('#search')){
            if(input.value !==''){
            fetchWeatherData(input.value,unit);
            }
        }

    })

    input.addEventListener('keyup',(e)=>{   
        if(e.key==='Enter'){
            if(input.value !==''){
            fetchWeatherData(input.value,unit);
            }
        }

    })
}();


fetchWeatherData('Belgrade','metric');
