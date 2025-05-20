
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
    width: window.innerWidth,
    height: 600,
    layout: {
        background: { color: '#111' },
        textColor: '#eee',
    },
    grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
    },
    priceScale: {
        borderColor: '#666',
    },
    timeScale: {
        borderColor: '#666',
    },
});

const candleSeries = chart.addCandlestickSeries();

// Replace this with your own API key and symbol
const API_KEY = 'YOUR_API_KEY';
const SYMBOL = 'AAPL';
const API_URL = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1min&outputsize=30&apikey=${API_KEY}`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        if (data && data.values) {
            const formattedData = data.values.reverse().map(bar => ({
                time: new Date(bar.datetime).getTime() / 1000,
                open: parseFloat(bar.open),
                high: parseFloat(bar.high),
                low: parseFloat(bar.low),
                close: parseFloat(bar.close)
            }));
            candleSeries.setData(formattedData);
        }
    });

document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
