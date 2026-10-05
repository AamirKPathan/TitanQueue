# Titan Queue

A minimal queue management API starter for the Titan Queue project.

## Features

- Health check endpoint
- View queue state
- Add customers to the queue
- Advance the queue
- Reset the queue

## Getting started

```bash
npm install
npm start
```

Then open:

- `http://localhost:3000/health`
- `http://localhost:3000/queue`

## Example requests

### Add someone to the queue

```bash
curl -X POST http://localhost:3000/queue/join \
  -H "Content-Type: application/json" \
  -d '{"name":"Jamie"}'
```

### Advance the queue

```bash
curl -X POST http://localhost:3000/queue/advance
```

## Scripts

- `npm start` — run the server
- `npm run dev` — run the server with nodemon
- `npm test` — placeholder test command for future coverage
