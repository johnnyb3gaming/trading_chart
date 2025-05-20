
window.addEventListener("DOMContentLoaded", function () {
    const chartContainer = document.getElementById("chart");

    const chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: 600,
        layout: {
            background: { color: "#111" },
            textColor: "#eee",
        },
        grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
        },
        priceScale: {
            borderColor: "#666",
        },
        timeScale: {
            borderColor: "#666",
        },
    });

    const candleSeries = chart.addCandlestickSeries();

    const sampleData = [
        { time: 1716172800, open: 100, high: 105, low: 95, close: 102 },
        { time: 1716176400, open: 102, high: 110, low: 101, close: 108 },
        { time: 1716180000, open: 108, high: 112, low: 106, close: 109 },
        { time: 1716183600, open: 109, high: 115, low: 107, close: 114 },
    ];

    candleSeries.setData(sampleData);
});
