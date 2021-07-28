import hx from './index.js'

document.body.innerHTML = hx.version

// const eventbus = hx.createEventBus()

// eventbus.emit('custom_event', 123)


hx.get('api.获取用户修改密码间隔天数', { 
  headers: {
    Authorization: 'witsight_eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ6aG91ZG01IiwiY3JlYXRlZCI6MTYyMDQ2NzgyNzAwMCwidXNlcklkIjoiNWMyMDhkYzMtYjUzMi00NjYxLTgyODItN2EyZDUzZmM1ZDZkIiwiYXBwQ29kZSI6Imh1YXgiLCJhdWQiOiJ3ZWIifQ.JZLRRSlilClbx8DZjuslhYyEw718HIzzvnXocVrd81HthkEqclKpiSRdH7_U8L8rTUpZMBTnwmGkaROpBbheyicnXVNy7wA_Vb70DcdXUil1MjIP1sYHTDMPK4yHpIGxYPiGev5RvNpKRgSetIw7eMLG1ILKroAdpW0cox3hBkY'
  } 
}).then(res => {
  debugger;
}).catch(err => {
  debugger;
})