import hexid from '@tadashi/hex-id'
import createEmotion from '@emotion/css/create-instance'

const key = `emotion${hexid().replace(/\d/g, '')}`

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
