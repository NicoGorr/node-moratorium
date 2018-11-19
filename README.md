# node-moratorium
Delay a promise

## Usage

```js
const moratorium = require('moratorium')

;(async function () {
    const text = 'print this after 1234 ms'

    await moratorium.resolve(1234)

    console.log(text)
})()
```

## API

### moratorium.resolve(time, value)

Resolves a Promise after a specific amout of time.

**Params:**\
`time` -> time to wait\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
const value = await moratorium.resolve(1000, 'Vitória')

console.log(value) // Prints Vitória after 1000 ms
```

### moratorium.reject(time, value)

Rejects a Promise after a specific amout of time.

**Params:**\
`time` -> time to wait\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
try {
    await moratorium.reject(1000, 'Vitória')
    // or
    await moratorium.reject(1000, new Error('Vitória'))
} catch (err) {
    console.log(err) // After the delay:
                     // In the frist case it prints Vitória,
                     // in the second the Error object
}
```

### moratorium.span.resolve(time, span, value)

Resolves a Promise after a randomic span of time.

**Params:**\
`time` -> time to wait\
`span` -> lower and upper bound added to `time` (both bounds are inclusive)\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
const value = await moratorium.span.resolve(1000, 500, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 500 ms (inclusive) and 1500 ms (inclusive)

const value = await moratorium.span.resolve(2300, 100, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 2200 ms (inclusive) and 2400 ms (inclusive)
```

### moratorium.span.reject(time, span, value)

Rejects a Promise after a randomic span of time.

**Params:**\
`time` -> time to wait\
`span` -> lower and upper bound added to `time` (both bounds are inclusive)\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
try {
    await moratorium.span.reject(1000, 500 'Vitória')
    // Rejects the promise after randomic time between 500 ms (inclusive) and 1500 ms (inclusive)

    await moratorium.span.reject(2300, 100, new Error('Vitória'))
    // Rejects the promise after randomic time between 2200 ms (inclusive) and 2400 ms (inclusive)
} catch (err) {
    console.log(err) // After the delay:
                     // In the frist case it prints Vitória,
                     // in the second the Error object
}
```

### moratorium.range.resolve(from, to, value)

Resolves a Promise after a randomic ranged amout of time.

**Params:**\
`from` -> lower bound (inclusive)\
`to` -> upper bound (inclusive)\
`value` -> value returned by the Promise after the time set through `from` and `to`

**Return:** `Promise`

```js
const value = await moratorium.range.resolve(234, 780, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 234 ms (inclusive) and 780 ms (inclusive)

const value = await moratorium.range.resolve(100, 350, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 100 ms (inclusive) and 350 ms (inclusive)
```


### moratorium.range.reject(from, to, value)

Rejects a Promise after a randomic ranged amout of time.

**Params:**\
`from` -> lower bound (inclusive)\
`to` -> upper bound (inclusive)\
`value` -> value returned by the Promise after the time set through `from` and `to`

**Return:** `Promise`

```js
try {
    await moratorium.range.reject(234, 780 'Vitória')
    // Rejects the promise after randomic time between 500 ms (inclusive) and 1500 ms (inclusive)

    await moratorium.range.reject(100, 350, new Error('Vitória'))
    // Rejects the promise after randomic time between 100 ms (inclusive) and 350 ms (inclusive)
} catch (err) {
    console.log(err) // After the delay:
                     // In the frist case it prints Vitória,
                     // in the second the Error object
}
```

## Promise properties and methods

Each `Promise` object returned from the methods above has the following properties and methods:

### promise.clear()

You can clear a delay by calling `clear()` method in the Promise returned by one of the methods above.

```js
const moratorium = require('moratorium')

;(async function () {
    const text = 'print this after 500 instead of 1000'

    const delay = moratorium.resolve(1000, text)

    setTimeout(() => {
        delay.clear() // Resolve the delay promise
        // or
        delay.clear('Error reason') // Reject the delay promise
        // or
        delay.clear(new Error('Custom error')) // Reject the delay promise with a custom error
    }, 500)

    try {
        await delay
    } catch (err) {
        console.log(err) // If cleared with reason or error object
    }

    console.log(delay.value) // If cleared without arguments
})()
```

### promise.time

It's the `time` that the Promise will have to wait before completion.

**N.B:** If the `time` is negative, it will be set to 0.

```js
const moratorium = require('moratorium')

;(async function () {
    const delay = moratorium.resolve(1234)

    await delay

    console.log(delay.time) // Prints 1234
})()
```

### promise.value

It's the `value` that will be returned by the Promise.

```js
const moratorium = require('moratorium')

;(async function () {
    const delay = moratorium.resolve(1000, 'Vitória')

    await delay

    console.log(delay.value) // Prints Vitória
})()
```