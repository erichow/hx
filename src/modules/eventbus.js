import { v4 as uuidv4 } from 'uuid'
import { existy } from './tool'

function createEventBus(type, fn) {
  let map = new Map()

  // 订阅
  function subscribe(type, fn) {
    const arr = map.get(type)
    const uuid = uuidv4()
    if (existy(arr)) {
      let find = _.find(arr, { fn })
      if (find) {
        return find.uuid
      } else {
        arr.push({ uuid, fn })
      }
    } else {
      map.set(type, [{ uuid, fn }])
    }
    return uuid
  }

  // 取消订阅
  function unsubscribe(type, fn_uuid) {
    const arr = map.get(type)
    if (!existy(arr)) return null
    let item = arr.filter(({ fn, uuid }) => fn === fn_uuid)[0]
    switch (typeof fn_uuid) {
      case 'function':
        return arr.splice(arr.indexOf(item) >>> 0, 1)
      case 'string':
        return arr.splice(arr.indexOf(item) >>> 0, 1)
    }
    return item
  }

  // 发布
  function publish(type, ...payload) {
    const arr = map.get(type)
    if (existy(arr)) {
      arr.forEach(({ fn }) => fn(...payload))
    }
  }

  return {
    // 订阅
    on: subscribe,
    subscribe: subscribe,

    // 取消订阅
    off: unsubscribe,
    unsubscribe: unsubscribe,

    // 发布
    emit: publish,
    trigger: publish,
  }
}

export { createEventBus }
