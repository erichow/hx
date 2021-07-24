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


function createRequest(){
	const instance = axios.create({
		url: '/user',
		method: 'get', // default
		// `baseURL` will be prepended to `url` unless `url` is absolute.
		// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
		// to methods of that instance.
		baseURL: 'https://some-domain.com/api/',
		// `transformRequest` allows changes to the request data before it is sent to the server
		// This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
		// The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
		// FormData or Stream
		// You may modify the headers object.
		transformRequest: [function (data, headers) {
		    // Do whatever you want to transform the data
		    return data;
		}],
		// `transformResponse` allows changes to the response data to be made before
		// it is passed to then/catch
		transformResponse: [function (data) {
			// Do whatever you want to transform the data
			return data;
		}],
		// `headers` are custom headers to be sent
		headers: {'X-Requested-With': 'XMLHttpRequest'},
		// `params` are the URL parameters to be sent with the request
		// Must be a plain object or a URLSearchParams object
		params: {
			ID: 12345
		},
		// `paramsSerializer` is an optional function in charge of serializing `params`
		// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
		paramsSerializer: function (params) {
			return Qs.stringify(params, {arrayFormat: 'brackets'})
		},
		// `data` is the data to be sent as the request body
		// Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
		// When no `transformRequest` is set, must be of one of the following types:
		// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
		// - Browser only: FormData, File, Blob
		// - Node only: Stream, Buffer
		data: {
			firstName: 'Fred'
		},
		// syntax alternative to send data into the body
		// method post
		// only the value is sent, not the key
		data: 'Country=Brasil&City=Belo Horizonte',
		// `timeout` specifies the number of milliseconds before the request times out.
		// If the request takes longer than `timeout`, the request will be aborted.
		timeout: 1 * 60 * 1000, // default is `0` (no timeout)
		// `withCredentials` indicates whether or not cross-site Access-Control requests
		// should be made using credentials
		withCredentials: false, // default
		// `adapter` allows custom handling of requests which makes testing easier.
		// Return a promise and supply a valid response (see lib/adapters/README.md).
		adapter: function (config) {
			/* ... */
		},
		headers: {'X-Custom-Header': 'foobar'}
	})

	return instance
}

function request(urlkey, params, config) {
	let instance = createRequest();
	switch (typeof urlkey) {
		case 'string':
			const { protocol } = url.parse(urlkey)
			if (existy(protocol)) {
				// return axios.post( urlkey, params, config)
				instance.request({
					url,
				})
			}
			handle_urlkey(urlConfig[urlkey])
			break;
		case 'object':
			break;

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


const hx = {
	version,
	existy,
	truthy,
	cat,
	construct,
	mapcat,
	createEventBus,
	uuid: uuidv4,
	request,
}

// const urlConfig = {
// 	'api.xxx': { 
// 		url: '/api/path', 
// 		method: 'post',
// 		publicPath: 'https://www.baidu.com',
// 		contentType: 'application/json;charset=utf-8',
// 	},
	// 'api.yyy': 'https://www.baidu.com/api/path',
// }
debugger;
hx.request('https://evitest.sanyevi.cn/', {a: 1, b: 2, headers: {}}, {})

export default hx

