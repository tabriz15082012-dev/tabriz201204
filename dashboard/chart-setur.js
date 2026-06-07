let weatherChart;

function initChart() {
  const ctx = document.getElementById('weatherChart').getContext('2d');
  weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Будет заполнено временами (например: 09:00, 12:00...)
      datasets: [{
        label: 'Прогноз температуры °C',
        data: [],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });
}

// Запускаем инициализацию сразу при загрузке скрипта
initChart();