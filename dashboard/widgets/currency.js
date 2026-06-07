async function updateCurrencyWidget() {
  try {
    const res = await fetch(CONFIG.CURRENCY_API);
    if (!res.ok) throw new Error('Ошибка сети при запросе валют');
    const data = await res.json();

    // Получаем сколько рублей (RUB) и евро (EUR) дают за 1 доллар (USD)
    const rubPerUsd = data.rates.RUB;
    const eurPerUsd = data.rates.EUR;

    if (rubPerUsd && eurPerUsd) {
      // 1. Курс доллара к рублю (USD/RUB)
      document.getElementById('rate-rub').innerText = rubPerUsd.toFixed(2) + ' ₽';
      
      // 2. Курс евро к рублю (EUR/RUB) через кросс-курс
      const eurToRub = rubPerUsd / eurPerUsd;
      document.getElementById('rate-eur').innerText = eurToRub.toFixed(2) + ' ₽';
    }

  } catch (err) {
    console.error('Ошибка валюты:', err);
    document.getElementById('rate-rub').innerText = 'ошибка';
    document.getElementById('rate-eur').innerText = 'ошибка';
  }
}