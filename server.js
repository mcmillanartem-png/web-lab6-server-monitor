// Лабораторная работа №6. Вариант 20 — «API статуса сервера»
const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

// Логирование каждого запроса в консоль
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Раздача статики (HTML, CSS, JS, иконки) из папки public
app.use(express.static(__dirname + '/public'));

// Главная
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// О себе
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// API статуса сервера
app.get('/api/status', (req, res) => {
  const result = {
    uptimeSeconds: Math.round(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    cpuCount: os.cpus().length,
    timestamp: new Date().toISOString(),
  };

  // Query-параметр: /api/status?details=true — добавить доп. сведения
  if (req.query.details === 'true') {
    result.platform = os.platform();
    result.nodeVersion = process.version;
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Открой в браузере: http://localhost:${PORT}`);
});
