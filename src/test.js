import hx from './index.js'

hx.get('api.获取验证码').then(res => {
	console.log(res);
})

document.body.innerHTML = hx.version
