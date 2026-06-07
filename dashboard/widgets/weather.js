// Переменная для хранения графика
let weatherChart = null;

// Функция инициализации графика (создается ОДИН раз)
function initWeatherChart() {
  const canvas = document.getElementById('weatherChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
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
      maintainAspectRatio: false, /* Позволяет графику идеально заполнять контейнер */
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 12 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 12 } } }
      }
    }
  });
}

// Главная функция обновления погоды
async function updateWeatherWidget() {
  // Если график еще не создан — создаем его
  if (!weatherChart) {
    initWeatherChart();
  }

  try {
    const res = await fetch(`https://wttr.in/${CONFIG.CITY}?format=j1`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // 1. Обновляем текстовые блоки
    const current = data.current_condition[0];
    document.getElementById('weather-city').innerText = CONFIG.CITY;
    document.getElementById('weather-temp').innerText = current.temp_C;
    document.getElementById('weather-desc').innerText = current.lang_ru?.[0]?.value || current.weatherDesc[0].value;

    // 2. Обновляем график (только если он успешно создался)
    if (weatherChart) {
      const hourlyData = data.weather[0].hourly;
      const labels = hourlyData.map(h => {
        const time = parseInt(h.time) / 100;
        return `${time === 0 ? '00' : time}:00`;
      });
      const temps = hourlyData.map(h => parseInt(h.tempC));

      weatherChart.data.labels = labels;
      weatherChart.data.datasets[0].data = temps;
      weatherChart.update();
    }

  } catch (err) {
    console.error('Ошибка погоды:', err);
    document.getElementById('weather-desc').innerText = 'Ошибка сети';
  }
}