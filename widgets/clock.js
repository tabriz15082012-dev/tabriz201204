function updateClock() {
    const now = new Date();
    document.getElementById('clock-time').innerText = now.toLocaleTimeString('ru-RU');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('clock-date').innerText = now.toLocaleDateString('ru-RU', options);
  }
  // Запускаем тиканье часов
  setInterval(updateClock, 1000);
  updateClock();