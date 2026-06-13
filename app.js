// Функция общего обновления
async function updateAllWidgets() {
    console.log('Обновление данных дашборда...', new Date().toLocaleTimeString());
    // Запускаем параллельно, чтобы один зависший запрос не тормозил остальные
    await Promise.allSettled([
      updateWeatherWidget(),
      updateCurrencyWidget(),
      updateNewsWidget()
    ]);
  }
  
  // Автообновление по интервалу из config.js
  setInterval(updateAllWidgets, CONFIG.REFRESH_INTERVAL);
  
  // Первый запуск при полной загрузке страницы
  window.addEventListener('load', () => {
    updateAllWidgets();
  });

  // Функция общего обновления данных
async function updateAllWidgets() {
  console.log('Обновление данных дашборда...', new Date().toLocaleTimeString());
  await Promise.allSettled([
    updateWeatherWidget(),
    updateCurrencyWidget(),
    updateNewsWidget()
  ]);
}

// Находим элементы на странице
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const dashboardWrapper = document.getElementById('dashboard-wrapper');

// Функция активации дашборда
function startDashboard() {
  // 1. Прячем стартовый экран с кнопкой
  welcomeScreen.classList.add('hidden');
  
  // 2. Показываем сам дашборд
  dashboardWrapper.classList.remove('hidden');
  
  // 3. Загружаем данные ПЕРВЫЙ раз (прямо сейчас)
  updateAllWidgets();
  
  // 4. Включаем АВТООБНОВЛЕНИЕ каждые 60 секунд
  setInterval(updateAllWidgets, CONFIG.REFRESH_INTERVAL);
}

// Ждем, пока пользователь нажмет на кнопку Dashboard
startBtn.addEventListener('click', startDashboard);

// Логика переключения светлой/темной темы
document.getElementById('theme-toggle').addEventListener('click', () => {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  
  // Переключаем класс темы на теге body
  body.classList.toggle('light-theme');
  
  // Меняем текст на кнопке в зависимости от текущей темы
  if (body.classList.contains('light-theme')) {
    btn.innerText = '🌙 Тёмная тема';
  } else {
    btn.innerText = '☀️ Светлая тема';
  }
  
  // Дополнительно: если график погоды существует, обновим его цвета под тему
  if (typeof weatherChart !== 'undefined' && weatherChart) {
    const isLight = body.classList.contains('light-theme');
    weatherChart.options.scales.x.ticks.color = isLight ? '#64748b' : '#94a3b8';
    weatherChart.options.scales.y.ticks.color = isLight ? '#64748b' : '#94a3b8';
    weatherChart.update();
  }
});