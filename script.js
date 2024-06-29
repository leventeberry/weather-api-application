
const apiKey = "3db02dfc262d4f0a750a4b828e67829e";
var searchHistory = [];

// set the search history
function setSearchHistory(searchHistory) {
    try {
        const historyJson = JSON.stringify(searchHistory);
        localStorage.setItem('searchHistory', historyJson);
    } catch (error) {
        console.error('Failed to save search history:', error);
    }
}

// get the search history
function getSearchHistory() {
    try {
        const historyJson = localStorage.getItem('searchHistory');
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
        console.error('Failed to retrieve search history:', error);
        return [];
    }
}

// display error function
function displayError(error) {
    // alert the user and suggest trying again
    alert("An error occurred: " + error.message + ". Please try again.");
    return null;
}

function addHistoryItem() {
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

function getCity() {
    const userSubmit = $('#search-bar');
    const city = userSubmit.val();
    getCityGeo(city);
}

async function getWeatherData(latitude, longitude) {
    //variables
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=6&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(apiCall);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No data found for the specified city');
        }
        const searchData = data;
        console.log(searchData);
    } catch (error) {
        console.error(error);
        // alert the user and suggest trying again
        displayError(error);
    }
}

async function getCityGeo(cityName) {
    
    const apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiCall);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No data found for the specified city');
        }

        // store returned json object to a variable
        const searchData = data[0];

        // grab essential information from data
        const searchedCity = {
            name: searchData.name,
            state: searchData.state,
            country: searchData.country,
            latitude: searchData.lat,
            longitude: searchData.lon
        };

        // push info to search history array
        searchHistory.push(searchedCity);

        // return object with lat and long
        return getWeatherData(searchedCity.latitude, searchedCity.longitude);

    } catch (error) {
        // display error message to browser and console
        console.error(error);
        displayError(error);
    }
}

