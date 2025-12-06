# Tiny Signals

The tiniest implementation of signals, ideal for vanilla JavaScript projects.

Based loosely on the [signals API](https://preactjs.com/guide/v10/signals/) of Preact.

Part of the [Plain Vanilla Web](https://plainvanillaweb.com) project.

## Usage

### Without NPM

Copy `signals.js` into your project.

Use it like this:

```js
import { signal, computed } from './signals.js';

const name = signal('Jane');
const surname = signal('Doe');
const fullName = computed(() => `${name} ${surname}`, [name, surname]);
// Logs name every time it changes:
fullName.effect(() => console.log(fullName.value));
// -> Jane Doe

// Updating `name` updates `fullName`, which triggers the effect again:
name.value = 'John';
// -> John Doe
```

### With NPM

Run `npm install @jsebrech/tiny-signals`

Use it like this:

```js
import { signal, computed } from '@jsebrech/tiny-signals';
// ...
```

### API

- `const mySignal = signal(val)`: creates a signal.
- `mySignal.value`: get or set the signal's value
- `const dispose = mySignal.effect(fn)`: call the function every time the signal's value changes, also call it initially. The `dispose()` function unregisters the effect from the signal.
- `const result = computed(() => 'hello ' + mySignal.value, [mySignal])`: create a signal that is computed from other signals and values by a function,
and will automatically update when the value of a dependency changes
- `mySignal.addEventListener('change', fn)`: subscribe to changes without calling the function initially

## Example

Run a static server:

`npx http-server .`

Browse to http://localhost:8080/example/adder.html

## Other versions

Typescript: [felixranesberger/tiny-signals-ts](https://github.com/felixranesberger/tiny-signals-ts)
