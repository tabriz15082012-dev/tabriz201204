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