import axios from 'axios';

const apiBaseUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const cityId = 2643744;
const apiKey = '685862771e8a6f08bb513ef6dc873ec6';

//Getting Data
const GetData = (wrapper,el) => {
  axios.get(apiBaseUrl, {
        params: {
          id: cityId,
          APPID: apiKey,
          cnt: '5',
          units: 'metric'

        }
      })
      .then(function (response) {
        const dataArray = response.data;
        const listArray = response.data.list;
        
        const name = dataArray.city.name;
        cityName(el, name);
        
        Array.prototype.forEach.call(listArray, function(res) {
          const dateobj = res.dt;
          const weatherArray = res.weather;
          const minTemperature = Math.round(res.temp.min);
          const maxTemperature = Math.round(res.temp.max);
          const dayTemperature = Math.round(res.temp.day);
          const nightTemperature = Math.round(res.temp.night);
          

          Array.prototype.forEach.call(weatherArray, function(weather) {
            const weatherIcon = weather.icon;
            const weatherDescription = weather.description;
            createUI(wrapper, el, dateobj, weatherIcon, weatherDescription, 
                    minTemperature, maxTemperature, dayTemperature, nightTemperature);
          });
        });
      })    
      .catch(function (error) {
        console.log(error);
    }); 
}

//Get Date
const getDate = (date) => {
  const dt = new Date(date * 1000); // args in milliseconds
  const dates = dt.toLocaleDateString();
  return dates;
}

//Converting Data from unix format
const convertDate = (date) => {
 const d = new Date(date * 1000); // This gives arg in milliseconds
 return d.getDay();
}


//Weather Icon 
const getWeatherIcon = (icon) => {
  const iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
  return iconUrl;
}


//City Name 
const cityName = (element, name) => {
  const city = `<h1> 5 day weather forecast for ${name}</h1>`
  let cityDiv = document.createElement('div');
  cityDiv.classList.add('city');
  cityDiv.innerHTML = city;
  element.appendChild(cityDiv);
} 

//Creating UI
const createUI = (wrapper,element,timestamp,icon,description,minTemperature,maxTemperature, dayTemperature, nightTemperature) => {
  const dat = getDate(timestamp); 
  const day = convertDate(timestamp);
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri' ];

  const dy = days[day];
  
  const dayElement = document.createElement('span');
  dayElement.classList.add('card__day');
  dayElement.innerHTML = dy;

  const dateElement = document.createElement('span');
  dateElement.classList.add('card__time');
  dateElement.innerHTML = dat;

  const imgUrl = getWeatherIcon(icon);
  const imgElement = document.createElement('img');
  imgElement.classList.add('card__image');
  imgElement.src = imgUrl;

  const desc = document.createElement('p');
  desc.classList.add('card__description');
  desc.innerHTML = description;

  const minTemp = document.createElement('p');
  minTemp.classList.add('card__temp');
  minTemp.innerHTML = `Min Temp : <span class="card__temp__deg"> ${minTemperature} &deg; <sup>c</sup></span>`;

  const maxTemp = document.createElement('p');
  maxTemp.classList.add('card__temp');
  maxTemp.innerHTML = `Max Temp : <span class="card__temp__deg"> ${maxTemperature} &deg; <sup>c</sup></span>`;

  const dayTemp = document.createElement('p');
  dayTemp.classList.add('card__temp');
  dayTemp.innerHTML = `Day Temp : <span class="card__temp__deg"> ${maxTemperature} &deg; <sup>c</sup></span>`;

  const nightTemp = document.createElement('p');
  nightTemp.classList.add('card__temp');
  nightTemp.innerHTML = `Night Temp : <span class="card__temp__deg"> ${nightTemperature} &deg; <sup>c</sup></span>`;
 

  const card = document.createElement('div');
  card.classList.add('card');

  //Constructing Day Element
  card.appendChild(dayElement);

  //Constructing Date Element
  card.appendChild(dateElement);

  // Constructing Icon Element
  card.appendChild(imgElement);

  //Constructing Description
  card.appendChild(desc);
  
  //Constructing Day Temperature
  card.appendChild(dayTemp);

  //Constructing Night Temperature
  card.appendChild(nightTemp);

  //Constructing Minimum Temperature
  card.appendChild(minTemp);

  //Constructing Maximum Temperature
  card.appendChild(maxTemp);

  //Appending the constructed Element to the main page

  wrapper.appendChild(card);

  element.appendChild(wrapper);
  
}

export default {
  GetData
}