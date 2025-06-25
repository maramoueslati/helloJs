const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const notifications = [];
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  console.log('Android client connected');
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Android client disconnected');
  });
});

app.get('/', (req, res) => { 
      res.status(200).send({ "text": "Hello iam alive" });

})
app.post('/send-notification', (req, res) => {
  const { title, body } = req.body;
  const message = { title, body };
  console.log('📨 Received notification:', message); 
  // Save to notifications list
  notifications.push(message);

  // Send to connected clients
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });

  res.status(200).send({ success: true });
});



app.get('/notifications', (req, res) => {
  res.status(200).json(notifications);
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

