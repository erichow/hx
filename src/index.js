import _ from 'lodash'
import { createEventbus } from '@m/eventbus'
import $http from '@m/xhr'

const version = '1.0.0'

const hx = {
	version,
	createEventbus,
	$http,
}

export default hx

export { $http }
