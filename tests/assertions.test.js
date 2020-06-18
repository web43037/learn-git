const asserts = require('../assertions');
const test = require('ava'); // ava

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

test('add two numbers', t => {
    let sum = asserts.add(1,2);
    t.is(sum, 3);
    // t.is(sum, 4);
});

test('enhanced assertions', t => {
    const a = /foo/;
    const b = 'bar';
    const c = 'baz';
    t.assert(a.test(b) || b !== c);
});