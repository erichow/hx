import $http from '@m/xhr'
import { createEventBus } from '@m/eventbus'

const version = '1.0.0'

const hx = {
	version,
	$http,
	createEventBus,
}

export default hx

export { $http }
