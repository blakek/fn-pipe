# Function Pipe

> 🚰 Compose functions and promises to make a pipeline

Code can become complex when several functions wrap others or `reduce()` is
abused for a list of funtions.

This is an alternative that allows creating a pipeline of the functions and
calls them in order.

## Install

Using [Yarn]:

```bash
$ yarn add @blakek/fn-pipe
```

…or using [npm]:

```bash
$ npm i --save @blakek/fn-pipe
```

## Usage

This example fetches a list of todos from a server, filters for completed todos,
and counts the result.

```js
import { fnPipe } from 'fn-pipe';

const userId = 5;

const getCompletedCount = fnPipe([
  userId => fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  todos => todos.filter(todo => todo.complted),
  todos => todos.length
], userId);

console.log(getCompletedCount()); // 12
```

## API

### `fnPipe`

```ts
function fnPipe(
  functions: Function[] | symbol,
  initialValue?: symbol | any
): FnPipeReturn;
```

### `__`

A placeholder flag indicating the value will be provided later.

```js
import { __, fnPipe } from 'fn-pipe';

const limit = limit => array => array.slice(0, limit);
const pluck = key => array => array.map(o => o[key]);

const topTitles = fnPipe([limit(10), pluck('title')], __);

const getImportantTodos = topTitles(todos);
const getTopBooks = topTitles(books);
```

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## License

MIT

[node.js]: https://nodejs.org/
[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/en/docs/
