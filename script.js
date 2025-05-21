
function loadChart(id) {
  const container = document.getElementById("chart" + id);
  container.innerHTML = "";
  const type = document.getElementById("type" + id).value;
  const symbol = document.getElementById("symbol" + id).value || "AAPL";

  const chart = LightweightCharts.createChart(container, {
    width: container.clientWidth,
    height: 300,
    layout: {
      background: { color: '#000' },
      textColor: '#FFF'
    },
    grid: {
      vertLines: { color: '#333' },
      horzLines: { color: '#333' }
    }
  });

  let series;
  if (type === "line") {
    series = chart.addLineSeries();
  } else if (type === "area") {
    series = chart.addAreaSeries();
  } else if (type === "bar") {
    series = chart.addBarSeries();
  } else if (type === "heikinashi") {
    series = chart.addCandlestickSeries();
  } else {
    series = chart.addCandlestickSeries();
  }

  const sampleData = [
    { time: 1716172800, open: 100, high: 105, low: 95, close: 102 },
    { time: 1716176400, open: 102, high: 110, low: 101, close: 108 },
    { time: 1716180000, open: 108, high: 112, low: 106, close: 109 },
    { time: 1716183600, open: 109, high: 115, low: 107, close: 114 },
  ];

  if (type === "line" || type === "area") {
    series.setData(sampleData.map(d => ({ time: d.time, value: d.close })));
  } else {
    series.setData(sampleData);
  }
}
