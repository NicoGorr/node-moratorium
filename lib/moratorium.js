const createDelay = (time = 0, value, { willResolve, setFunction, clearFunction }) => {
  let delayId = null
  let resolveFn = null
  let rejectFn = null

  const promise = new Promise((resolve, reject) => {
    const onDelayComplete = willResolve ? resolve : reject

    resolveFn = resolve
    rejectFn = reject

    delayId = setFunction(
      onDelayComplete,
      time,
      value
    )
  })

  promise.clear = (err) => {
    clearFunction(delayId)

    if (err) {
      return rejectFn(err)
    }

    return resolveFn(value)
  }

  promise.time = time < 0 ? 0 : time
  promise.value = value

  return promise
}

function createDelayResolve (time, value) {
  return createDelay(time, value, { willResolve: true, setFunction: setTimeout, clearFunction: clearTimeout })
}

function createDelayReject (time, value) {
  return createDelay(time, value, { willResolve: false, setFunction: setTimeout, clearFunction: clearTimeout })
}

function generateSpan (span) {
  const doubleSpan = span * 2
  const random = Math.random() * doubleSpan

  return Math.round(random) - span
}

function createSpanDelayResolve (time, span, value) {
  return createDelayResolve(time + generateSpan(span), value)
}

function createSpanDelayReject (time, span, value) {
  if (time - span < 0) {
    throw new Error('Span is bigger than time.')
  }

  return createDelayReject(time + generateSpan(span), value)
}

exports.resolve = createDelayResolve
exports.reject = createDelayReject

exports.span = {}
exports.span.resolve = createSpanDelayResolve
exports.span.reject = createSpanDelayReject