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
const value = await moratorium.resolve(1000, 'Vitória')

console.log(value) // Prints Vitória after 1000 ms
```

### moratorium.span.resolve(time, span, value)

Resolves a Promise after a pseudo-randomic amout of time.

**Params:**\
`time` -> time to wait\
`span` -> maxium span\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
const value = await moratorium.span.resolve(1000, 500, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 500 ms and 1500 ms

const value = await moratorium.span.resolve(2300, 100, 'Vitória')
console.log(value) // Prints Vitória after randomic time between 2200 ms and 2400 ms
```


### moratorium.span.reject(time, span, value)

Rejects a Promise after a pseudo-randomic amout of time.

**Params:**\
`time` -> time to wait\
`span` -> maxium span\
`value` -> value returned by the Promise after the time set through `time`

**Return:** `Promise`

```js
const value = await moratorium.span.reject(1000, 500 'Vitória')
// Rejects the promise after randomic time between 500 ms and 1500 ms

const value = await moratorium.span.resolve(2300, 100, 'Vitória')
// Rejects the promise after randomic time between 2200 ms and 2400 ms
```

## Clear a delay

You can clear a delay by calling `clear()` method in the Promise returned by one of the methods above.

### Example

```js
const moratorium = require('moratorium')

;(async function () {
    const text = 'print this after 500 instead of 1000'

    const delay = moratorium.resolve(1000)

    setTimeout(() => {
        delay.clear() // Resolve the delay promise
        // or
        delay.clear('Error reason') // Reject the delay promise
    }, 500)

    await delay

    console.log(text) // Printed after 500 ms instead of 1000 ms
})()
```