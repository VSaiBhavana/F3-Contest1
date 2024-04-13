document.addEventListener("DOMContentLoaded", function () {
    getCurrentImageOfTheDay();
    loadSearchHistory();
    
    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault();
        getImageOfTheDay();
    });

    document.getElementById("search-history").addEventListener("click", function (event) {
        if (event.target && event.target.nodeName == "LI") {
            const date = event.target.textContent;
            getImageOfTheDay(date);
        }
    });
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImage(currentDate);
}

function getImageOfTheDay(date) {
    const selectedDate = date || document.getElementById("search-input").value;
    getImage(selectedDate);
    saveSearch(selectedDate);
}

function getImage(date) {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => console.log("Error fetching image:", error));
}

function displayImage(data) {
    const imageContainer = document.getElementById("current-image-container");
    imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory(date);
}

function loadSearchHistory() {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(date => {
        addSearchToHistory(date);
    });
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById("search-history");
    const listItem = document.createElement("li");
    listItem.textContent = date;
    searchHistory.appendChild(listItem);
}
