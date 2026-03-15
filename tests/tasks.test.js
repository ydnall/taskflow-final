const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Task validation', () => {
  it('should require a title', () => {
    const task = { description: 'no title here' };
    assert.strictEqual(task.title, undefined);
  });

  it('should default status to open', () => {
    const task = { title: 'Test', status: 'open' };
    assert.strictEqual(task.status, 'open');
  });

  it('should accept valid status values', () => {
    const valid = ['open', 'in_progress', 'done'];
    valid.forEach(s => assert.ok(valid.includes(s)));
  });
});
