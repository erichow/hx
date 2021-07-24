import _ from 'lodash'

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

const version = '1.0.0'

const hx = {
	existy,
	truthy,
	cat,
	version,
}

export default hx
