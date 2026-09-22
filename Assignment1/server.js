const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${timestamp}] ${method} ${url}`);

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Node Server');
  } else if (url === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page');
  } else if (url === '/contact' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contact Page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Error: Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/ to test routes:`);
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/about`);
  console.log(`  - http://localhost:${PORT}/contact`);
});

module.exports = server;

