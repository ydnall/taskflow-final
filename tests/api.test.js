const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');

describe('POST /tasks validation', () => {
  let server;
  const port = 3001;
  const baseUrl = `http://localhost:${port}`;

  before(async () => {
    const app = require('../src/index.js');
    return new Promise((resolve) => {
      server = app.listen(port, () => {
        resolve();
      });
    });
  });

  after(async () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('should return 400 if title is missing', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'no title' })
    });
    assert.strictEqual(response.status, 400);
    const body = await response.json();
    assert.ok(body.error);
  });

  it('should return 400 if title is empty string', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' })
    });
    assert.strictEqual(response.status, 400);
  });

  it('should return 400 if title is not a string', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 123 })
    });
    assert.strictEqual(response.status, 400);
  });

  it('should return 400 if description is not a string', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Task', description: 123 })
    });
    assert.strictEqual(response.status, 400);
  });

  it('should return 400 if assignee is not a string', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Task', assignee: true })
    });
    assert.strictEqual(response.status, 400);
  });

  it('should create task if title is valid', async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Valid Task' })
    });
    assert.strictEqual(response.status, 201);
    const body = await response.json();
    assert.strictEqual(body.title, 'Valid Task');
  });
});
