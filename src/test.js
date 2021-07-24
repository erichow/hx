import hx from './index.js'

document.body.innerHTML = hx.version

const eventbus = hx.createEventBus()

const fn = v => {
	alert(v);
}
const uuid = eventbus.on('custom_event', v => {
	alert(v);
})
eventbus.off('custom_event', uuid);

const uuid2 = eventbus.on('custom_event', v => {
	alert(v);
})

eventbus.emit('custom_event', 123)
