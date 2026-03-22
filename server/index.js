import { createPublicApiServer } from './createServer.js';
import { initializeRuntimeStorage } from './storage.js';

const port = Number.parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '127.0.0.1';

await initializeRuntimeStorage();

const server = createPublicApiServer();

server.listen(port, host, () => {
  console.log(`LaRucula public API listening on http://${host}:${port}`);
});

function shutdown(signal) {
  server.close(() => {
    console.log(`LaRucula public API stopped after ${signal}`);
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
