const { createServer } = require('http');
const http = require('http');
const https = require('https');
const dns = require('dns');
const next = require('next');

// 1. Force IPv4 first DNS lookup to eliminate Windows IPv6 localhost delay
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// 2. Global Agent Connection Pooling for high-throughput, low-latency outbound requests
http.globalAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 128,
  maxFreeSockets: 64,
  timeout: 30000,
});

https.globalAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 128,
  maxFreeSockets: 64,
  timeout: 30000,
});

const dev = false;
const hostname = '0.0.0.0';
const port1 = parseInt(process.env.PORT || '3000', 10);
const port2 = parseInt(process.env.PORT_SECONDARY || '3001', 10);

const app = next({ dev, hostname, dir: __dirname });
const handle = app.getRequestHandler();

function configureServerSockets(server) {
  // 65s keep-alive timeout prevents socket disconnection churn
  server.keepAliveTimeout = 65000;
  // headersTimeout must be higher than keepAliveTimeout to prevent race conditions
  server.headersTimeout = 66000;
  server.requestTimeout = 30000;
  server.maxHeadersCount = 2000;
}

app.prepare().then(() => {
  // Server 1 (Primary - Port 3000)
  const server1 = createServer({ keepAlive: true }, (req, res) => {
    if (req.socket && typeof req.socket.setNoDelay === 'function') {
      req.socket.setNoDelay(true); // Disable Nagle's algorithm for instant packet dispatch
    }
    handle(req, res);
  });
  configureServerSockets(server1);

  server1.listen(port1, hostname, () => {
    console.log(`⚡ IELTS Mastery Server (Primary) listening on http://localhost:${port1} [TCP NoDelay: ON, Keep-Alive: 65s, IPv4 Priority: ON]`);
  });

  // Server 2 (Secondary - Port 3001)
  const server2 = createServer({ keepAlive: true }, (req, res) => {
    if (req.socket && typeof req.socket.setNoDelay === 'function') {
      req.socket.setNoDelay(true);
    }
    handle(req, res);
  });
  configureServerSockets(server2);

  server2.listen(port2, hostname, () => {
    console.log(`⚡ IELTS Mastery Server (Secondary) listening on http://localhost:${port2} [TCP NoDelay: ON, Keep-Alive: 65s, IPv4 Priority: ON]`);
  });

  const shutdown = () => {
    console.log('Shutting down dual servers...');
    server1.close(() => {
      server2.close(() => {
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}).catch((err) => {
  console.error('Failed to initialize Next.js server:', err);
  process.exit(1);
});
