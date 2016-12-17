import test from 'ava';

test('Array.indexOf should return -1 if the value is not in the array', (t) => {
  t.is([1, 2, 3].indexOf(5), -1);
  t.is([1, 2, 3].indexOf(0), -1);
});
