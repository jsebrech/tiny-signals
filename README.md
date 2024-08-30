# Tiny Signals

The tiniest implementation of signals, ideal for vanilla JavaScript projects.

Baed loosely on the [signals API](https://preactjs.com/guide/v10/signals/) of Preact.

## Usage

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

API:

- `const mySignal = signal(val)`: creates a signal.
- `mySignal.value`: get or set the signal's value
- `mySignal.effect(fn)`: call the function every time the signal's value changes, also call it initially
- `const result = computed(() => 'hello ' + mySignal.value, [mySignal])`: create a signal that is computed from other signals and values by a function,
and will automatically update when the value of a dependency changes