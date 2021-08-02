import _ from 'lodash'
import axios from 'axios'
import url from 'url'

// 全局的 axios 默认值
axios.defaults.timeout = 3 * 1000
axios.defaults.method = 'get'
axios.defaults.baseURL = 'https://www.example.cn/api'
axios.defaults.headers.common['Authorization'] = ''
axios.defaults.headers.common['version'] = '1.0.0'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

const urlcfg = {
  
  ...(function () {
    const fw = 'portal'
    return {
      'api.获取菜单': `/${fw}/sercurity/allMenuInfo`,
      'api.获取字典': `/${fw}/common/allDictionarys`,
    }
  })(),

  ...(function () {
    const fw = 'alarm'
    return {
      'api.故障码查询': `/${fw}/alarm/code`,
      'api.故障码详细': `/${fw}/alarm/detail`,
    }
  })(),

  'api.登录': {
    method: 'post',
    url: `/login`,
  },
  'api.验证码': {
    url: `/generateCaptcha`,
    responseType: 'blob',
  },
}

/** 
  obj2axioscfg(before) // after

  const before = {
    username: 'erichow',
    password: '1234567',
    aa: 11,
    bb: 22,
    headers: {
      version: '1.0.0',
      Authorization: 'token',
    },
    method: 'post',
    url: '/login',
    baseURL: 'https://www.example.com/api',
    data: {
      cc: 33,
      dd: 44
    }
  }

  const after = {
    headers: {
      version: '1.0.0',
      Authorization: 'token'
    },
    method: 'post',
    url: '/login',
    baseURL: 'https://www.example.com/api',
    data: {
      cc: 33,
      dd: 44,
      username: 'erichow',
      password: '1234567',
      aa: 11, 
      bb: 22,
    }
  }
*/

function obj2axioscfg(obj) {
  const keys = [
    'url',
    'method',
    'baseURL',
    'transformRequest',
    'transformResponse',
    'headers',
    'params',
    'paramsSerializer',
    'data',
    'timeout',
    'withCredentials',
    'adapter',
    'auth',
    'responseType',
    'responseEncoding',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'maxContentLength',
    'validateStatus',
    'maxRedirects',
    'socketPath',
    'httpAgent',
    'httpsAgent',
    'proxy',
    'cancelToken',
  ]
  const params = _.pickBy(obj, (v, k) => keys.indexOf(k) === -1)
  const partconfig = _.omitBy(obj, (v, k) => keys.indexOf(k) === -1)
  const config = _.merge({}, partconfig, { data: params })
  return config
}

/**
  url2obj(before) // after

  const before = '/login'
  const after = {
    url: '/login'
  }

  const before = 'https://www.example.com/api/login'
  const after = {
    baseURL: 'https://www.example.com',
    url: '/api/login'
  }
*/

function url2obj(str) {
  if (typeof str !== 'string') throw `url must be string >> ${str}`
  const { hostname, pathname } = url.parse(str)
  return {
    baseURL: hostname || undefined,
    url: pathname,
  }
}

/**
  urlkey2obj(before) // after

  const before = 'api.登录'
  const after = {
    url: '/login'
  }

  const before = '/login'
  const after = {
    url: '/login'
  }

  const before = 'https://www.example.com/api/login'
  const after = {
    baseURL: 'https://www.example.com'
    url: '/api/login'
  }
*/

function urlkey2obj(str) {
  if (typeof str !== 'string') throw `urlkey must be string >> ${str}`
  const v = urlcfg[str]
  switch (typeof v) {
    case 'object':
      return obj2axioscfg(v)
    case 'string':
      return url2obj(v)
    case 'undefined':
      return url2obj(str)
  }
}

/**
  $http('api.登录', {
    headers: {
      version '1.0.0',
      Authorization: 'token'
    },
    username: 'erichow',
    password: '1234567',
    captchacode: '1234',
    captchaid: 'uuid',
    type: 0
  })
*/

const $http = (urlkey, params) => {
  try {
    const urlobj = urlkey2obj(urlkey)
    const config = _.merge({}, obj2axioscfg(urlobj), obj2axioscfg(params))
    return axios(config)
  } catch (err) {
    console.error(err)
  }
}

export default $http
