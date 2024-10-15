let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let key = "903688b3bef8d6bb3aff586b3a1e1c22";


// Function to get current date and time
function showCurrentDateTime() {
  return new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }).replace(',', '');

  document.getElementById('date-time').innerHTML = currentDateTime;
}



//function to fetch weather details from api and display them..
let getWeather = () => {
  let cityValue = cityRef.value;

  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    cityRef.value = "";

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);

        result.innerHTML = `
        <h2 class="location">${data.name}</h2>
	<p id="date-time" class="date">${showCurrentDateTime()}</p>
   
	<img class="icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
        <h1 class="current-temp">${data.main.temp} &#176;C </h1>

        <div class="environment"">
           <h4 class="weather">${data.weather[0].main}<\h4>
           <h4 class="desc">${data.weather[0].description}</h4>
        </div>

        <div class="temp-container">  
           <div class="min-temp">
              <h4 class='title'>Minimun :</h4>
              <h4 class='temp'>${data.main.temp_min} &#176;C</h4>
           </div> 

           <div class="max-temp">
              <h4 class='title'>Maximum :</h4>
              <h4 class='temp'>${data.main.temp_max} &#176;C</h4>
           </div>      
        </div>
       
       <div class="wind-speed">
            <h4 class="title">Wind Speed :</h4>
            <h4 class="speed"> ${data.wind.speed} m/s </h4>
       </div>

        `;


       showCurrentDateTime();
       setInterval(showCurrentDateTime, 1000);



      })
      .catch(() => {
        result.innerHTML = `<h3 class="error-msg">City Not Found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);





