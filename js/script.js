
const apiKey = "3db02dfc262d4f0a750a4b828e67829e";
var searchHistory = [];

// function searchCity {

// }

function addHistory() {
    //find parent container for history container
    var searchContainer = $('#search-container');

    //create elements
    var historyContainer = $('<div></div>');
    historyContainer.addClass('mt-2');
    var historyButton = $('<button></button>');
    historyButton.addClass('history-button btn-primary text-center rounded p-2 mb-2');

    //last step, append the item to the page
    searchContainer.append(historyContainer);

}

function add5dayForecast() {
    
}

function getWeatherData(params) {
    
}

function getCityGeo (city) {
    var api = apiKey;
    var userSubmit = $('#search-bar');
    var city = userSubmit.val();
    var apiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + api;
    var geoLocation = [];
    fetch(apiCall)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            // places json object in a variable
            const searchData = data[0];
            const searchedCity = {
                name : searchData.name,
                state : searchData.state,
                country : searchData.country,
                latitude : searchData.lat,
                longitude : searchData.lon
            };
            searchHistory.push(searchedCity);
            
            geoLocation[0].push(searchedCity.latitude);
            geoLocation[1].push(searchedCity.longitude);
        })
    return geoLocation;
}

