import createEmotion from '@emotion/css/create-instance'
import {getEnv} from './env'

const {APP_NS = 'app'} = getEnv()
const key = `emotion-${APP_NS.replace(/\d/g, '').replace('_', '-')}`

export const {
	flush,
	hydrate,
	cx,
	merge,
	getRegisteredStyles,
	injectGlobal,
	keyframes,
	css,
	sheet,
	cache
} = createEmotion({key})
