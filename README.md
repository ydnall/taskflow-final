# TaskFlow API

A lightweight REST API for task management and team collaboration.

## Features
- Create, read, update, and delete tasks
- Filter tasks by status
- Assign tasks to team members
- Simple in-memory storage (swap for your DB)

## Quick Start

```bash
npm install
npm start
```

The server starts on `http://localhost:3000`.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /tasks | List all tasks |
| GET | /tasks/:id | Get a task |
| POST | /tasks | Create a task |
| PATCH | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

### Query Parameters

- `GET /tasks?status=open` - Filter by status (`open`, `in_progress`, `done`)

### Example

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Review PR", "assignee": "alice"}'
```

## Testing

```bash
npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
