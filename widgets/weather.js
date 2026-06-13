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
async function updateNewsWidget() {
  const newsContainer = document.getElementById('news-list');
  if (!newsContainer) return;

  try {
    const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3');
    if (!res.ok) throw new Error('Ошибка загрузки новостей');
    const data = await res.json();

    newsContainer.innerHTML = ''; 

    const widgetTitle = newsContainer.parentElement.querySelector('h2');
    if (widgetTitle) {
      widgetTitle.innerText = 'Мировые новости';
    }

    data.results.forEach(article => {
      const item = document.createElement('div');
      item.className = 'news-item';
      // УБРАЛИ ЖЕСТКИЕ ЦВЕТА, ТЕПЕРЬ ОНИ БЕРУТСЯ ИЗ КЛАССОВ CSS
      item.innerHTML = `
        <div class="news-title">
          ${article.title}
        </div>
        <div class="news-source">
          Источник: ${article.news_site || 'СМИ'}
        </div>
      `;
      newsContainer.appendChild(item);
    });

  } catch (err) {
    console.error('Ошибка виджета новостей:', err);
    newsContainer.innerHTML = '<div class="news-source">Сбой сети. Ожидание...</div>';
  }
}