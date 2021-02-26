
function getData() {
    var searchInput = document.getElementById("searchInput").value;
    var date = getDate();

    document.getElementById("maincontainer").style.display = "block" ;
    
    var onlyWeatherCheckbox = document.querySelector("#onlyweather");
    var onlyAttractionsCheckbox = document.querySelector("#onlyattractions");
    var filterAlphabeticallyCheckbox = document.querySelector("#filteralphabetically");

    if (onlyWeatherCheckbox.checked == true && onlyAttractionsCheckbox.checked == false) {
        document.getElementById("weathercontainer").style.display = "block";
        document.getElementById("attractioncontainer").style.display = "none";
        getWeatherData(searchInput);
    }
    else if (onlyAttractionsCheckbox.checked == true && onlyWeatherCheckbox.checked == false) {
        document.getElementById("attractioncontainer").style.display = "block";
        document.getElementById("weathercontainer").style.display = "none";
        getAttractionsData(searchInput, date);
    }
    else if (onlyAttractionsCheckbox.checked == false && onlyWeatherCheckbox.checked == false) {
        document.getElementById("weathercontainer").style.display = "block";
        getWeatherData(searchInput);
        getAttractionsData(searchInput, date);
    }
    else {
        document.getElementById("maincontainer").innerText = "No data to show!"
    }
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
    console.log(searchInput);

     fetch("https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=8d141e7ff86b157ab911daed7c1b290b&mode=JSON&units=metric")
            .then(response => response.json())
            .then(data => {
                readWeatherData(data);
            })
}

function readWeatherData(data) {

   console.log(data)
   var day = getDay();

   document.querySelector("#city").innerText = data.name
   document.querySelector("#day").innerText = day
   document.querySelector("#temp").innerText = data.main.temp +' degrees celsius'
   document.querySelector("#wind").innerText = data.wind.speed + ' m/s,  ' + data.wind.deg + ' degrees'
   document.querySelector("#weather").innerText = data.weather[0].description
   document.querySelector("#weathericon").src = data.weather[0].icon
}


function getAttractionsData(searchInput, date) {
    console.log(searchInput, date);

    fetch("https://api.foursquare.com/v2/venues/search?client_id=N1QKMDBXOVR3JOEYXQAI3RKLS245YZC5JCHGFGZFEOX50F4F&client_secret=CNEQGCG5PY31BWZPLI1UPOP3XSZMQHNVVXDGYQG5SEQNT3GI&v="+date+"&near="+searchInput+"&intent=browse&radius=10000&limit=10")
        .then(response => response.json())
        .then(attractionData => {
            readAllAttractionData(attractionData);
        })
}

function readAllAttractionData(attractionData) {


    var attractionContainer = document.querySelector("#attractioncontainer");
    var venues = attractionData.response.venues;
    let html = '';

    venues.forEach(venue => {
        let htmlSegment = '<div class="allattractionbox">' + 
                            '<div>' + venue.name + '</div>' +
                            '<img src=' + venue.categories[0].icon.prefix + "bg_32" + venue.categories[0].icon.suffix + '>' +
                            '<div>' + venue.location.formattedAddress + '</div>' +
                        '</div>';
        html += htmlSegment;

    });
    attractionContainer.innerHTML = html;
}
