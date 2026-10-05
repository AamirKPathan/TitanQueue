const express = require('express');

const PORT = process.env.PORT || 3000;

function createApp() {
  const app = express();
  let queue = [];

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'Titan Queue',
      queueLength: queue.length,
    });
  });

  app.get('/queue', (_req, res) => {
    res.json({
      queue,
      queueLength: queue.length,
    });
  });

  app.post('/queue/join', (req, res) => {
    const name = req.body?.name?.trim();

    if (!name) {
      return res.status(400).json({
        error: 'A customer name is required.',
      });
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      joinedAt: new Date().toISOString(),
    };

    queue.push(entry);

    return res.status(201).json({
      message: `${name} joined the queue.`,
      entry,
      queueLength: queue.length,
    });
  });

  app.post('/queue/advance', (_req, res) => {
    if (queue.length === 0) {
      return res.status(200).json({
        message: 'The queue is empty.',
        next: null,
        queueLength: 0,
      });
    }

    const next = queue.shift();

    return res.status(200).json({
      message: `${next.name} is now being served.`,
      next,
      queueLength: queue.length,
      remainingQueue: queue,
    });
  });

  app.put('/queue/reset', (_req, res) => {
    queue = [];
    return res.json({
      message: 'Queue reset successfully.',
      queueLength: 0,
    });
  });

  return app;
}

const app = createApp();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Titan Queue running on http://localhost:${PORT}`);
  });
}

module.exports = { app, createApp };
