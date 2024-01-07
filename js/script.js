
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

function getWeatherData(params) {
    
}

async function getCityGeo(city) {
    const api = apiKey;
    const userSubmit = $('#search-bar');
    const city = userSubmit.val();
    const apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`;

    try {
        const response = await fetch(apiCall);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No data found for the specified city');
        }

        const searchData = data[0];
        const searchedCity = {
            name: searchData.name,
            state: searchData.state,
            country: searchData.country,
            latitude: searchData.lat,
            longitude: searchData.lon
        };

        // Assuming searchHistory is a global array
        searchHistory.push(searchedCity);

        return { latitude: searchedCity.latitude, longitude: searchedCity.longitude };
    } catch (error) {
        console.error(error);
        // alert the user and suggest trying again
        alert("An error occurred: " + error.message + ". Please try again.");
        return null;
    }
}

