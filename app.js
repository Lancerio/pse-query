const PSE_Data = "https://phisix-api3.appspot.com/stocks.json";
const message = document.getElementById('message');
const searchBar = document.getElementById('search-bar');
const stockSearch = document.getElementById('stock-search');

let stockName = document.getElementById('stock-name');
let stockSymbol = document.getElementById('stock-symbol');
let stockChange = document.getElementById('stock-change');
let stockPrice = document.getElementById('stock-price');
let stockVolume = document.getElementById('stock-volume');

// Event Listener
searchBar.addEventListener('submit', (e) => {
    e.preventDefault();
    getData(PSE_Data);
})

// Functions
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPriceInfo(data);
    } catch (err) {
        alert('Data not available from source.');
        console.log(err);
    }
}

function displayPriceInfo(data) {
    const stockQuery = stockSearch.value.toUpperCase();
    const stocks = Object.values(data.stock);
    const result = stocks.find(({ symbol }) => symbol === stockQuery);

    // Find Symbol
    if (result) {
        const result = stocks.find(({ symbol }) => symbol === stockQuery);
        setValues();
        message.style.color = '';
    } else {
        setEmptyValue(stockName);
        setEmptyValue(stockChange);
        setEmptyValue(stockPrice);
        setEmptyValue(stockSymbol);
        setEmptyValue(stockVolume);
        message.innerHTML = 'NO MATCH FOUND';
        message.style.color = 'red';
    }

    stockSearch.value = '';

    // Set Field Values
    function setValues() {
        const { name, percent_change, price, symbol, volume } = result;
        stockName.innerHTML = `${name}`;
        stockChange.innerHTML = `${percent_change.toFixed(2)}`;
        stockPrice.innerHTML = `${price.amount.toFixed(4)}`;
        stockSymbol.innerHTML = `${symbol}`;
        stockVolume.innerHTML = `${volume.toLocaleString()}`;
        message.innerHTML = `as of ${data.as_of.slice(0, 10)}`;
        setColor();
    }

    function setEmptyValue(val) {
        val.innerHTML = '';
    }

    // Set % change color
    function setColor() {
        const { percent_change } = result;
        if (percent_change > 0) {
            stockChange.style.color = 'green';
        } else {
            stockChange.style.color = 'red';
        }
    }
}
