
let chartCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.getElementById("chart-container");

  document.getElementById("add-chart").addEventListener("click", () => {
    if (chartCount >= 3) {
      alert("You can only open up to 3 charts.");
      return;
    }
    chartCount++;
    const chartId = `chart${chartCount}`;
    const journalId = `journal${chartCount}`;

    const chartBlock = document.createElement("div");
    chartBlock.className = "chart-block";
    chartBlock.innerHTML = `
      <h2>Chart ${chartCount}</h2>
      <input type="text" placeholder="Symbol (e.g., AAPL, BTC/USD)" id="symbol${chartCount}" />
      <select id="type${chartCount}">
        <option value="candlestick">Candlestick</option>
        <option value="line">Line</option>
      </select>
      <button onclick="loadChart('${chartId}', '${chartCount}')">Load</button>
      <div id="${chartId}" class="chart"></div>
      <div class="journal-panel" id="${journalId}">
        <h2>Journal</h2>
        <textarea placeholder="Entry Notes"></textarea>
        <button onclick="exportJournal('${journalId}')">Export</button>
      </div>
    `;
    chartContainer.appendChild(chartBlock);
  });

  window.loadChart = function(containerId, chartIndex) {
    const symbol = document.getElementById(`symbol${chartIndex}`).value || "AAPL";
    const type = document.getElementById(`type${chartIndex}`).value;
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const chart = LightweightCharts.createChart(container, {
      width: container.clientWidth,
      height: 300,
      layout: { background: { color: "#000" }, textColor: "#FFF" },
      grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
    });

    let series;
    if (type === "line") {
      series = chart.addLineSeries();
    } else {
      series = chart.addCandlestickSeries();
    }

    const sampleData = [
      { time: 1716172800, open: 100, high: 105, low: 95, close: 102 },
      { time: 1716176400, open: 102, high: 110, low: 101, close: 108 },
      { time: 1716180000, open: 108, high: 112, low: 106, close: 109 },
      { time: 1716183600, open: 109, high: 115, low: 107, close: 114 },
    ];

    if (type === "line") {
      series.setData(sampleData.map(d => ({ time: d.time, value: d.close })));
    } else {
      series.setData(sampleData);
    }
  };

  window.exportJournal = function(journalId) {
    const notes = document.querySelector(`#${journalId} textarea`).value;
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${journalId}_journal.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
});
