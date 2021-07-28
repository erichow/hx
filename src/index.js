import _ from 'lodash'
import path from 'path'
import axios from 'axios'
import url from 'url'
import Qs from 'qs'
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




const urlConfig = {
	...function() {
		const SERVER = ''
		return {
			'api.登录请求': '/login',
			'api.获取验证码': {
				url: '/generateCaptcha',
				responseType: 'blob',
				responseCallback(res) {
					debugger;
				}
			},
		}
	}(),
	...function() {
		const SERVER = '/portal'
		return {
			'api.获取用户修改密码间隔天数': '/system/user/getUserLastResetPwdDays',
			'api.获取菜单': '/portal/sercurity/allMenuInfo',
			'api.获取字典': '/portal/common/allDictionarys',
			'api.请求页面权限': '/portal/sercurity/pages',
			'api.请求元素权限': '/portal/sercurity/elements',
		}
	},
}

// 实例化axios
function createAxiosInstance(options) {
	const axios_instance = axios.create(options)
	axios_instance.interceptors.request.use(function (config) {
		// 在发送请求之前做些什么
		debugger;
		console.log(_, path, handleURLByString)
		const handleURL = handleURLWithConfig(config)
		return handleURL(config.url);
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	})

	axios_instance.interceptors.response.use(function (response) {
		const { config } = response
		config.responseCallback && config.responseCallback(response)
		return response;
	}, function (error) {
		return Promise.reject(error);
	})

	return axios_instance;
}


function handleURLByString(value, baseURL) {
	const { protocol } = url.parse(value)
	if (existy(protocol)) {
		return value
	}
	return path.resovle(baseURL, value)
}

function handleURLByObj(value, baseURL) {
	handleUrlByString(value.url, value.baseURL || baseURL)
}

const handleURLWithConfig = _.curryRight((value, config) => {
	if (_.isString(value)) {
		const { protocol } = url.parse(value)
		if (existy(protocol)) {
			return value
		}
		return path.resovle(config.baseURL, value)
	}
	if (_.isObject(value)) {
		return handleUrlByObj(value.url, value.baseURL || baseURL)
	}
})




function getWithInstance(axios_instance, url, params) {
	const Authorization = 'mytoken';
	return axios_instance({
		method: 'get',
		responseType: 'blob',
		url,
		headers: {
			Authorization,
		},
		...params
	})
}


const get = _.curry(getWithInstance)(createAxiosInstance({
	baseURL: 'https://example/api',
	method: 'get',
	headers: {
		version: 1,
	}
}))





const hx = {
	version,
	existy,
	truthy,
	cat,
	construct,
	mapcat,
	createEventBus,
	uuid: uuidv4,
	handleURLByString,
	get,
}

get('api.获取验证码', {})

export default hx

