import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('repo keeps both classic and holiday site variants', () => {
  assert.equal(existsSync('sites/classic/index.html'), true);
  assert.equal(existsSync('sites/classic/styles.css'), true);
  assert.equal(existsSync('sites/classic/script.js'), true);
  assert.equal(existsSync('sites/holiday-2026/index.html'), true);
  assert.equal(existsSync('sites/holiday-2026/styles.css'), true);
  assert.equal(existsSync('sites/holiday-2026/script.js'), true);
});

test('classic and holiday sites contain their expected event copy', () => {
  const classicHtml = readFileSync('sites/classic/index.html', 'utf8');
  const holidayHtml = readFileSync('sites/holiday-2026/index.html', 'utf8');

  assert.match(classicHtml, /UTR VERIFIED EVENT/);
  assert.match(holidayHtml, /School Holiday Tournament/);
  assert.match(holidayHtml, /Player list to be finalised/);
});
