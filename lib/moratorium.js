const createDelay = (time = 0, value, { willResolve, setFn, clearFn }) => {
  let delayId = null
  let resolveFn = null
  let rejectFn = null

  const promise = new Promise((resolve, reject) => {
    const onDelayComplete = willResolve ? resolve : reject

    resolveFn = resolve
    rejectFn = reject

    delayId = setFn(
      onDelayComplete,
      time,
      value
    )
  })

  promise.clear = (err) => {
    clearFn(delayId)

    if (err) {
      return rejectFn(err)
    }

    return resolveFn(value)
  }

  promise.time = Math.max(0, time)
  promise.value = value

  return promise
}

function generateRandomRange (from, to) {
  const fromTo = to - from
  const random = Math.random() * fromTo

  return Math.round(random) + from
}

function createDelayResolve (time, value) {
  return createDelay(time, value, { willResolve: true, setFn: setTimeout, clearFn: clearTimeout })
}

function createDelayReject (time, value) {
  return createDelay(time, value, { willResolve: false, setFn: setTimeout, clearFn: clearTimeout })
}

function createRangeDelayResolve (from, to, value) {
  return createDelayResolve(generateRandomRange(from, to), value)
}

function createRangeDelayReject (from, to, value) {
  return createDelayReject(generateRandomRange(from, to), value)
}

function createSpanDelayResolve (time, span, value) {
  return createRangeDelayResolve(time - span, time + span, value)
}

function createSpanDelayReject (time, span, value) {
  return createRangeDelayReject(time - span, time + span, value)
}

exports.resolve = createDelayResolve
exports.reject = createDelayReject

exports.span = {}
exports.span.resolve = createSpanDelayResolve
exports.span.reject = createSpanDelayReject

exports.range = {}
exports.range.resolve = createRangeDelayResolve
exports.range.reject = createRangeDelayReject
