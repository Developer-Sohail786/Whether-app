let city = document.querySelector(".location");
let feels = document.querySelector(".feels");
let humidity = document.querySelector(".humidity");
let tem = document.querySelector(".temp");
let type = document.querySelector(".type");
let image = document.getElementById("img");
let inp = document.getElementById("inp");
let API_key = "6d83156e4e40ca97d0c6924b832fe00c";
let btn = document.querySelector(".btn");

const data = async (clik) => {
  let getData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${clik}&appid=${API_key}&units=metric`
  );
  console.log(getData);
  let jsonData = await getData.json();

  if (jsonData.cod === "400" && jsonData.message === "Nothing to geocode") {
    alert("Enter a location");
    image.src = "error2.png";
    city.innerHTML = "";
    tem.innerHTML = "";
    type.innerHTML = "";
    return;
  }

  // ❌ Handle invalid city name (404 error)
  if (jsonData.cod === "404") {
    alert("City not found");
    image.src = "404.jpg";
    city.innerHTML = "";
    tem.innerHTML = "";
    type.innerHTML = "";
    return;
  }
  console.log(jsonData);
  // console.log(jsonData.name);
  // console.log(jsonData.main.temp);
  // console.log(jsonData.main.feels_like);
  // console.log(jsonData.main.humidity);

  // Displaying the text on the page

  city.innerHTML = jsonData.name;
  tem.innerHTML = Math.floor(jsonData.main.temp) + "°C";
  type.innerHTML = jsonData.weather[0].main;
  feels.innerHTML = "Feels Like  " + Math.floor(jsonData.main.feels_like) + " °C";
  humidity.innerHTML = "Humidity: " + jsonData.main.humidity+"%";

  // Displaying image on the page
  if (type.innerHTML == "Clouds") {
    image.src = "clouds.png";
  } else if (type.innerHTML == "Clear") {
    image.src = "clears.png";
  } else if (type.innerHTML == "Rain") {
    image.src = "rain.png";
  } else if (type.innerHTML == "Snow") {
    image.src = "rain.png";
  } else if (type.innerHTML == "Haze") {
    image.src = "haze.png";
  } else if (type.innerHTML == "Strom") {
    image.src = "strom.png";
  }
  inp.value = "";
};

function clik() {
  search = inp.value;
  data(search);
}

btn.addEventListener("click", () => {
  clik();
});

inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clik();
  }
});
