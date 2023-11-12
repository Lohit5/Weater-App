let usertab = document.querySelector("[data-yourweather]");
let searchtab = document.querySelector('[data-searchweather]')
const searchform = document.querySelector("[data-searchform]");
const loadimage = document.querySelector(".loading-container");
const grantacess = document.querySelector("[data-grantcontainer]");
const weatherinfo = document.querySelector(".user-info-container");


const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let oldTab= usertab;
usertab.classList.add("current-tab");
getFromSessionStorage();




 
function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchform.classList.contains("active")) {
            grantacess.classList.remove("active");
            searchform.classList.add("active");
            weatherinfo.classList.remove("active");
            apiErrorContainer.classList.remove("active");


        } else {
            searchform.classList.remove("active");
            apiErrorContainer.classList.remove("active");
            weatherinfo.classList.remove("active");
            getFromSessionStorage();
        }
    }
};

usertab.addEventListener("click", () => {
    switchTab(usertab)
})


searchtab.addEventListener("click", () => {
    switchTab(searchtab);
});





function getFromSessionStorage() {
    const
        localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantacess.classList.add("active")
    } else {
        const coordinates = JSON.parse(
            localCoordinates
        );
        fetchUserWeatherInfo(coordinates);
    }
}





async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantacess.classList.remove("active");
    loadimage.classList.add("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadimage.classList.remove("active");
        weatherinfo.classList.add("active");
        renderweather(data);

    } catch (error) {
        loadimage.classList.remove("active");
    }

}



function renderweather(data) {
    
    const cityName = document.querySelector("[data-cityname]");
    const cityIcon = document.querySelector("[data-cityicon]");
    const desc = document.querySelector("[data-weatherinfo]");
    const weatherIcon = document.querySelector("[data-weathericon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudy = document.querySelector("[data-cloud]");
    cityName.innerText = data?.name;
    cityIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = `${data?.main?.temp} ° C`;
    windspeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity} %`;
    cloudy.innerText = `${data?.clouds?.all} %`;

}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        alert("Geolocation is not supported by this browser.")
    }
};


function showPosition(position) {


    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    
    sessionStorage.setItem("user-coordinats", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}





const grantAcessbutton = document.querySelector("[data-grantAccess]");
grantAcessbutton.addEventListener("click", getLocation);



let searchInput = document.querySelector("[data-searchInput]");
searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "") {
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
        searchInput.value="";
    }
});
const apiErrorContainer = document.querySelector(".api-error-container")
const errormessage=document.querySelector("[data-apiErrorText]");
const errorimage=document.querySelector("[data-notFoundImg]");












async function fetchSearchWeatherInfo(city) {
    loadimage.classList.add("active");
    weatherinfo.classList.remove("active");
    grantacess.classList.remove("active");
    apiErrorContainer.classList.remove("active");



    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        if (!data.sys) {
            throw data;
          }

    apiErrorContainer.classList.remove("acitve");
        loadimage.classList.remove("active");
        weatherinfo.classList.add("active");
        renderweather(data);
        apiErrorContainer.classList.remove("active");


    } catch (error) {

        loadimage.classList.remove("active");
        apiErrorContainer.classList.add("active");
        errormessage.innerText=`${error?.message}`;
        errorimage.style.display === "none";  

        


    }

}










