import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'
import url from 'url'
import moment from 'moment-timezone'
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


function handle_urlkey(urlkey) {
	urlValue = urlConfig[urlkey];
	switch (typeof urlValue) {
		case 'string':
			const { protocol } = url.parse(urlValue)
			if (existy(protocol)) {
				return urlValue
			}
			return path.resovle(baseURL, urlValue)
		case 'object':
			const { url, method, publicPath, contentType } = urlValue
			axios({
				method,
				url: path.resolve(publicPath || window.location.origin, url),
				headers: {

				}
			})
	}
}

const get = axios.create({
	baseURL: 'https://abc/api',
	method: 'get',
	headers: {
		version: 1,
	}
})

const post = axios.create({
	baseURL: 'https://abc/api',
	method: 'post',
	headers: {
		version: 1,
	}
})

get.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
})

get.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	return Promise.reject(error);
})

const hx = {
	version,
	existy,
	truthy,
	cat,
	construct,
	mapcat,
	createEventBus,
	uuid: uuidv4,
	get,
	post,
}




export default hx

