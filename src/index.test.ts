import test from 'ava';
import { __, fnPipe } from './index';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const todos = [{ title: 'be cool' }, { title: 'enjoy life' }];
const fetchTodos = () => delay(60).then(() => todos);
const pluck = (key: string) => (list: any[]) => list.map(o => o[key]);

test('passes output from function-to-function', async t => {
  const addSeven = (n: number) => n + 7;
  const timesThree = (n: number) => n * 3;

  const actual = await fnPipe([addSeven, timesThree], 8);
  t.is(actual, 45);
});

test('works with Promises', async t => {
  const count = (arr: any[]) => arr.length;
  const actual = await fnPipe([fetchTodos, count]);

  t.is(actual, 2);
});

test('works with function placeholder', async t => {
  const first = (array: any[]) => array[0];

  const transformTodos = fnPipe(__, await fetchTodos());

  const titles = await transformTodos([pluck('title')]);
  t.deepEqual(titles, ['be cool', 'enjoy life']);

  t.deepEqual(await transformTodos([first]), { title: 'be cool' });
});

test('works with value placeholder', async t => {
  const limit = (limit: any) => (array: any[]) => array.slice(0, limit);

  const books = [
    { title: 'The Republic' },
    { title: 'Man’s Search For Meaning' },
    { title: 'The Road to Wigan Pier' },
    { title: 'Brave New World' },
    { title: 'Animal Farm' }
  ];

  const getTopTitles = fnPipe([limit(4), pluck('title')], __);

  t.deepEqual(await getTopTitles(todos), ['be cool', 'enjoy life']);

  t.deepEqual(await getTopTitles(books), [
    'The Republic',
    'Man’s Search For Meaning',
    'The Road to Wigan Pier',
    'Brave New World'
  ]);
});
