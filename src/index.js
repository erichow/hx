import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const version = '1.0.0'

function existy(v) {
	return v != null
}

function truthy(v) {
	return existy(v) && v != false
}

function cat() {
	const head = _.head(arguments)
	if (existy(head)) {
		return head.concat.apply(head, _.tail(arguments))
	}
	else {
		return []
	}
}

function construct(head, tail) {
	return cat([head], _.toArray(tail))
}

function mapcat(fn, coll) {
	return cat.apply(null, _.map(coll, fn))
}

function createEventBus(type, fn) {
	
	let map = new Map();

	// 订阅
	function subscribe(type, fn) {
		const arr = map.get(type)
		const uuid = uuidv4()
		if (existy(arr)) {
			let find = _.find(arr, { fn })
			if (find) {
				return find.uuid
			}
			else {
				arr.push({ uuid, fn })
			}
			

		}
		else {
			map.set(type, [{ uuid, fn}])
		}
		return uuid
	}

	// 取消订阅
	function unsubscribe(type, fn_uuid) {
		const arr = map.get(type)
		let item;
		if (!existy(arr)) return null
		switch (typeof fn_uuid) {
			case 'function':
				item = arr.filter(({ fn, uuid }) => fn === fn_uuid)[0]
				return arr.splice(arr.indexOf(item) >>> 0, 1)
			case 'string':
				item = arr.filter(({ fn, uuid }) => uuid === fn_uuid)[0]
				return arr.splice(arr.indexOf(item) >>> 0, 1)
		}

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
		on:subscribe,
		subscribe: subscribe,

		// 取消订阅
		off: unsubscribe,
		unsubscribe: unsubscribe,

		// 发布
		emit: publish,
		trigger: publish,
	}
}

const hx = {
	version,
	existy,
	truthy,
	cat,
	construct,
	mapcat,
	createEventBus,
	uuid: uuidv4,
}

export default hx

