let weather = {
    apiKey:"APIKEY :)",
    fetchWeather:function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+
         city +
        "&units=metric&appid=" + 
        this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    displayWeather: function(data){
        const {name} = data ;
        const {icon, description} = data.weather[0] ;
        const {temp, humidity, pressure} = data.main;
        const { speed } = data.wind;
        const {lon, lat} = data.coord;
        const {sunrise, sunset} = data.sys;
        document.querySelector(".city").textContent = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").textContent = description;
        document.querySelector(".temperature").textContent = temp + "°C";
        document.querySelector(".huminidity").textContent ="Huminidty: "+ humidity +"%";
        document.querySelector(".wind").textContent = "Wind Speed: "+ speed + " km/h";
        document.querySelector(".pressure").textContent = "Pressure: "+ pressure + " hPa";
        
        //sunrise 
        const millisecondsSunrise = sunrise * 1000
        const dateObjectSunrise = new Date(millisecondsSunrise)
        let text = dateObjectSunrise.toTimeString()
        document.querySelector('.sunrise').textContent = "Sunrise: " + text.split(" ")[0]

        //sunset 
        const millisecondsSunset = sunset * 1000
        const dateObjectSunset = new Date(millisecondsSunset)
        let textSunrise = dateObjectSunset.toTimeString()
        document.querySelector('.sunset').textContent = "Sunset: " + textSunrise.split(" ")[0]

        document.querySelector('.weather').classList.remove('loading')
        document.body.style.background = "url('https://source.unsplash.com/random/1920x1080/?"+ description +"') no-repeat";   
        document.body.style.backgroundSize = "cover"

        //polution function used cord from displayWeather
        console.log(lon,lat)
        this.Polution(lon,lat)
    },
    //deeper diging in json 
    Polution: function (lon,lat) {
        fetch("https://api.openweathermap.org/data/2.5/air_pollution?lat="+
        lat +
        "&lon=" + 
        lon +
        "&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((dataPolution) =>this.displayPolution(dataPolution))
    },

    displayPolution:function (dataPolution){
        const {no2,pm10,o3} = dataPolution.list[0].components;
        const {aqi} = dataPolution.list[0].main;
        document.querySelector(".No2").textContent = no2;
        document.querySelector(".PM10").textContent = pm10;
        document.querySelector(".o3").textContent = o3;
        let shortcutFirstRow = document.querySelector(".firstRow").style
        let shortcutSecondRow = document.querySelector(".secondRow").style
        let shortcutThirdRow = document.querySelector(".thirdRow").style
        
        //no2
        if(no2 <= 50){
            shortcutFirstRow.color ="#79bc6a";
            document.querySelector('.firstRowScale').textContent = "Good"
        }else {
            if(no2 >= 50.01 && no2 <= 100){
                shortcutFirstRow.color ="#bbcf4c"
                document.querySelector('.firstRowScale').textContent = "Fair"
            }
            else if(no2 >= 100.01 && no2 <= 200){
                shortcutFirstRow.color ="#eec20b"
                document.querySelector('.firstRowScale').textContent = "Moderate"
            }
            else if(no2 >= 200.01 && no2 <= 400){
                shortcutFirstRow.color ="#f29305"
                document.querySelector('.firstRowScale').textContent = "Poor"
            }
            else if(no2 >= 400.01){
                shortcutFirstRow.color ="#e8416f"
                document.querySelector('.firstRowScale').textContent = "Very Poor"
            }
        }
        //pm10
        if(pm10 <= 25){
            shortcutSecondRow.color ="#79bc6a";
            document.querySelector('.secondRowScale').textContent = "Good"
        }else{
            if(pm10 >= 25.01 && pm10  <= 50){
                shortcutSecondRow.color ="#bbcf4c"
                document.querySelector('.secondRowScale').textContent = "Fair"
            }
            else if(pm10 >= 50.01 && pm10  <= 90){
                shortcutSecondRow.color ="#eec20b"
                document.querySelector('.secondRowScale').textContent = "Moderate"
            }
            else if(pm10 >= 90.01 && pm10 <= 180){
                shortcutSecondRow.color ="#f29305"
                document.querySelector('.secondRowScale').textContent = "Poor"
            }
            else if(pm10 >= 180.01){
                shortcutSecondRow.color ="#e8416f"
                document.querySelector('.secondRowScale').textContent = "Very Poor"
            }
        }
        //o3
        if(o3 <= 60){
            shortcutThirdRow.color ="#79bc6a";
            document.querySelector('.thirdRowScale').textContent = "Good"
        }else{
            if(o3 >= 60.01 && o3 <= 120){
                shortcutThirdRow.color ="#bbcf4c"
                document.querySelector('.thirdRowScale').textContent = "Fair"
            }
            else if(o3 >= 120.01 && o3 <= 180){
                shortcutThirdRow.color ="#eec20b"
                document.querySelector('.thirdRowScale').textContent = "Moderate"
            }
            else if(o3 >= 180.01 && o3 <= 240){
                shortcutThirdRow.color ="#f29305"
                document.querySelector('.thirdRowScale').textContent = "Poor"
            }
            else if(o3 >= 240){
                shortcutThirdRow.color ="#e8416f"
                document.querySelector('.thirdRowScale').textContent = "Very Poor"
            }
        }

    },


    search: function(){
        this.fetchWeather(document.querySelector(".searchBar").value)
    }
}

document.querySelector(".search button").addEventListener('click',function(){
    weather.search();
})

document.querySelector(".searchBar").addEventListener('keyup',function(e) {
    if(e.key === "Enter" || e.keycode === 13){
        weather.search();
    }
})

weather.fetchWeather("Kraków")



//popup 

const popupOpen = document.querySelector('.polution')
const popupClose = document.querySelectorAll('.closePopup') //zwraca tablice potrzebne foreach
const popupMenu = document.querySelector('.polutionPopup')
popupOpen.addEventListener('click',function (){
    popupMenu.setAttribute('data-visible',true)
    popupOpen.setAttribute('data-visible-left',true)
    
})
popupClose.forEach(item => {
    item.addEventListener('click',function (){
    popupMenu.setAttribute('data-visible',false)
    setTimeout(function(){
    popupOpen.setAttribute('data-visible-left',false)},500)
    
})
})


