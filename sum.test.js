const sum = require('./sum');

test('add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adding two numbers', () => {
    expect(sum(0, 2)).toBe(2);
});

test('add zeros', () => {
    expect(sum(0, 0)).toBe(0);
});

test('add two negative numbers', () => {
    expect(sum(-3, -2)).toBe(-5);
});


