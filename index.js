const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res) => {
  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
  } else if (req.url === '/client.js') {
    const js = fs.readFileSync(path.join(__dirname, 'client.js'));
    res.writeHead(200, {'Content-Type':'application/javascript'});
    res.end(js);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('message', (msg) => {
    // 받은 메시지 그대로 모든 클라이언트에 브로드캐스트
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

server.listen(3000, () => console.log('Server listening on http://localhost:3000'));
