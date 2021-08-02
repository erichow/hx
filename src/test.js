import hx, { $http } from './index.js'
// import { notification } from 'antd'

$http('api.验证码')
  .then((res) => {
    const { captchaid } = res.headers
    const { config, data } = res
    const imgsrc = URL.createObjectURL(data)
    document.body.innerHTML = `<img src ="${imgsrc}" />`
    return captchaid
  })
  .then((captchaid) => {})
  .catch((err) => {
    debugger;
    console.log(err)
    // notification.open({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   onClick: () => {
    //     console.log('Notification Clicked!')
    //   },
    // })
  })

$http('api.登录', {
  username: 'zhoudm5',
  password: 'Fire8120@@',
  captchacode: '1234',
  captchaid: 'uuid',
  type: 0,
}).catch((err) => {
  console.log(err)
})
