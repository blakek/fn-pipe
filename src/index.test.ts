import test from 'ava';
import { fnPipe } from './index';

test('passes output from function-to-function', async t => {
  const addSeven = (n: number) => n + 7;
  const timesThree = (n: number) => n * 3;

  const actual = await fnPipe([addSeven, timesThree], 8);
  t.is(actual, 45);
});

test('works with Promises', async t => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const todos = [{ title: 'be cool' }, { title: 'enjoy life' }];
  const fetchTodos = () => delay(60).then(() => todos);
  const count = (arr: any[]) => arr.length;

  const actual = await fnPipe([fetchTodos, count]);

  t.is(actual, 2);
});
