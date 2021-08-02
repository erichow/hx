import hx from './index.js'
import _ from 'lodash'
import axios from 'axios'
import url from 'url'
document.body.innerHTML = hx.version

const urlcfg = {
  ...function() {
    const fw = 'portal'
    return {
      'api.登录': {
        baseURL: `https://www.baidu.com/api`,
        url: `/${fw}/login`,
        responseType: 'blob'
      },
      'api.验证码': `${fw}/cache`
    }
  }(),
  ...function() {
    const fw = 'alarm'
    return {
      'api.围栏告警': {
        headers: { a: '11'},
        // baseURL: `https://www.baidu.com/api`,
        url: `/${fw}/login`,
        responseType: 'blob'
      },
      'api.保存围栏': `${fw}/cache`
    }
  }(),
  'api.忘记密码': 'https://www.baidu.com/abc',
}


// function parseurlkey(urlkey) {
//   const v = urlcfg[urlkey]
//   switch (typeof v) {
//     case 'object':
//       return v
//     case 'string':
//       return {
//         baseURL: url.parse(v).hostname,
//         url: url.parse(v).pathname
//       }
//   }
// }


// function $http(urlkey, params) {
//   const urlobj = parseurlkey(urlkey)
//   axios({
//     ...urlobj,
//     ...params,
//   })
// }



// const parseurl = _.curry((hostname, prefix, fw, urlobj) => {
//   console.log(`${hostname}/${prefix}/${fw}/${url}`)
//   return {
//     baseURL: `${hostname}/${prefix}/${fw}`,
//     ...urlobj,
//   }
// })

// const baseurl = parseurl('https://evidev.sanyevi.cn')
// const api = baseurl('api')
// const portal = api('portal')


// const parsekey = _.curry((key, cfg) => {
  
// })


// const $http = _.flowRight(portal, handle_urlkey)


// $http('api.保存围栏', {
//   headers: {
//     version: '1.0.0'
//   },
//   params: {
//     username: 'erichow',
//     password: '1234567',
//   }
// })

