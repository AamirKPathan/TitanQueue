const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');

let server;

test.before(async () => {
  const app = createApp();
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
});

test('health endpoint returns service info', async () => {
  const port = server.address().port;
  const response = await fetch(`http://localhost:${port}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.service, 'Titan Queue');
});

test.after(() => {
  server.close();
});
