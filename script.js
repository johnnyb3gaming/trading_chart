// Ensure the library exists
const chartContainer = document.getElementById('chart');

if (window.LightweightCharts) {
    const chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
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

    // Sample data to test chart
    const sampleData = [
        { time: 1683921600, open: 100, high: 105, low: 95, close: 102 },
        { time: 1683925200, open: 102, high: 110, low: 101, close: 108 },
        { time: 1683928800, open: 108, high: 112, low: 106, close: 109 },
        { time: 1683932400, open: 109, high: 115, low: 107, close: 114 },
    ];

    candleSeries.setData(sampleData);
} else {
    console.error("LightweightCharts is not loaded.");
}
