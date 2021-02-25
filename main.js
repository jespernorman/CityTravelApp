
function getData() {
    var searchInput = document.getElementById("searchInput").value;
    var date = getDate();

    getWeatherData(searchInput);
    getAttractionsData(searchInput, date )
}
function getDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = yyyy+mm+dd;
    return date;
}
  function getDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
    var day = weekday[d.getDay()];
    return day;
}
function getWeatherData(searchInput) {
    alert(searchInput);
    console.log(searchInput);

     fetch("https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=8d141e7ff86b157ab911daed7c1b290b&mode=JSON&units=metric")
            .then(response => response.json())
            .then(data => {
                readWeatherData(data);
            })
}

function readWeatherData(data) {

   console.log(data)
   document.querySelector("#city").innerText = "City: " + data.name
   document.querySelector("#weather").innerText = data.weather[0].description
   document.querySelector("#temp").innerText = data.main.temp +' degrees celsius'
   document.querySelector("#wind").innerText = data.wind.speed + ' m/s,  ' + data.wind.deg + ' degrees'
}


function getAttractionsData(searchInput, date) {
    console.log(searchInput, date);

    fetch("https://api.foursquare.com/v2/venues/search?client_id=N1QKMDBXOVR3JOEYXQAI3RKLS245YZC5JCHGFGZFEOX50F4F&client_secret=CNEQGCG5PY31BWZPLI1UPOP3XSZMQHNVVXDGYQG5SEQNT3GI&v="+date+"&near="+searchInput+"&intent=browse&radius=10000&limit=10")
        .then(response => response.json())
        .then(attractionData => {
            readAttractionData(attractionData);
        })
}

function readAttractionData(attractionData) {
   
    console.log(attractionData);
    
    var attractionContainer = document.querySelector("attractioncontainer").innerText = attractionData.venues;
    var maxAttraction = 10;
    var attractionName = document.querySelector("#attractionname").innerText = "Attractionname: " + attractionData.response.venues[0].name
    var attractionAdress = document.querySelector("#attractionadress").innerText = "Adress: " + attractionData.response.venues[0].location.formattedAddress
    var attractionIkon = document.querySelector("#imgid").src = attractionData.response.venues[0].categories[0].icon.prefix+"bg_32"+attractionData.response.venues[0].categories[0].icon.suffix

    attractionData.forEach(attractioncontainer => console.log(attractionContainer)) 
    {     
        console.log(attractioncontainer);

    };
    // attractionContainer.attractionName + attractionContainer.attractionAdress + attractioncontainer.attractionIkon);

    // document.querySelector("#attractionname").innerText = "Attractionname: " + attractionData.response.venues[0].name
    // document.querySelector("#attractionadress").innerText = "Adress: " + attractionData.response.venues[0].location.formattedAddress
    // document.querySelector("#imgid").src = attractionData.response.venues[0].categories[0].icon.prefix+"bg_32"+attractionData.response.venues[0].categories[0].icon.suffix
}
/*
class search {

    constructor(searchInput) {

    }
    executeSearch() {
        fetch('api.openweathermap.org/data/2.5/weather?q={searchInput}&appid={8d141e7ff86b157ab911daed7c1b290b}')
        .then(Response => {
            if(Response.ok) {
                return Response.json()
            }
            throw new error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            console.log(jsonRespose)
        })        
    }
}*/

