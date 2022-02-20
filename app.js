const PSE_Data = "https://phisix-api3.appspot.com/stocks.json";

const message = document.getElementById('message');
const searchBar = document.getElementById('search-bar');
const stockSearch = document.getElementById('stock-search');

const values = document.querySelectorAll('.info-value');
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
        // alert('Data not avaiable from source.');
        console.log(err);
    }
}

function displayPriceInfo(data) {
    const stockQuery = stockSearch.value.toUpperCase();

    // Convert Object to Array
    const stocks = Object.values(data.stock);

    if (!stocks) {
        message.innerHTML = 'Data not available from source';
    }

    // Loop
    for (let i = 0; i < stocks.length; i++) {
        const name = stocks[i].name;
        const change = stocks[i].percent_change;
        const price = stocks[i].price;
        const symbol = stocks[i].symbol;
        const volume = stocks[i].volume;

        if (symbol === stockQuery) {
            stockName.innerHTML = `${name}`;
            stockChange.innerHTML = `${change.toFixed(2)}`;
            stockPrice.innerHTML = `${price.amount.toFixed(4)}`;
            stockSymbol.innerHTML = `${symbol}`;
            stockVolume.innerHTML = `${volume.toLocaleString()}`;
            message.innerHTML = `as of ${data.as_of.slice(0, 10)}`;
            break;
        } else {
            message.innerHTML = 'NO MATCH FOUND';
        }
        stockSearch.value = '';
    }

    // Change % color
    function setColor(n) {
        if (n < 0) {
            stockChange.classList.add('down');
        } else {
            stockChange.classList.add('up');
        }
    }
}
