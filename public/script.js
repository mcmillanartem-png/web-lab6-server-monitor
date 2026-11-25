// Регистрация service worker (для работы офлайн)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Загрузка данных с сервера (только на главной странице)
async function loadStatus() {
  const response = await fetch('/api/status');
  const data = await response.json();

  document.getElementById('uptime').textContent = data.uptimeSeconds;
  document.getElementById('memory').textContent = data.memoryUsageMB;
  document.getElementById('cpu').textContent = data.cpuCount;
  document.getElementById('time').textContent = data.timestamp;
}

const button = document.getElementById('refresh');
if (button) {
  button.addEventListener('click', loadStatus);
  loadStatus();
}
