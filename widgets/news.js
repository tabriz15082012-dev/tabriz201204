async function updateNewsWidget() {
  const newsContainer = document.getElementById('news-list');
  if (!newsContainer) return;

  try {
    // Используем открытый и свободный API новостей (работает без ключей и VPN)
    const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3');
    
    if (!res.ok) throw new Error('Ошибка загрузки новостей');
    const data = await res.json();

    // Очищаем контейнер от старых надписей
    newsContainer.innerHTML = ''; 

    // Заголовок возвращаем обратно на "Новости"
    const widgetTitle = newsContainer.parentElement.querySelector('h2');
    if (widgetTitle) {
      widgetTitle.innerText = 'Мировые новости';
    }

    // Выводим 3 актуальные новости на экран
    data.results.forEach(article => {
      const item = document.createElement('div');
      item.className = 'news-item';
      item.innerHTML = `
        <div class="news-title" style="font-weight: 600; font-size: 1.1rem; line-height: 1.4; color: #f8fafc;">
          ${article.title}
        </div>
        <div class="news-source" style="color: #38bdf8; font-size: 0.85rem; margin-top: 4px;">
          Источник: ${article.news_site || 'СМИ'}
        </div>
      `;
      newsContainer.appendChild(item);
    });

  } catch (err) {
    console.error('Ошибка виджета новостей:', err);
    // На случай если интернет совсем пропал, пишем понятный текст
    newsContainer.innerHTML = '<div class="news-source" style="color: #ef4444;">Временный сбой сети. Ожидание обновления...</div>';
  }
}