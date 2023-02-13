import {getProp} from '@tadashi/common'
import {getRender, getEnv, getData} from './lib/env.js'
import {app} from './app.js'

const envs = getEnv()

const _TARGET_JS_IMPORT = getProp(import.meta.url, 'TARGET_JS')
const _TARGET_JS_ENV = envs?.TARGET_JS
const TARGET_JS = _TARGET_JS_IMPORT ?? _TARGET_JS_ENV ?? ''

const target = getRender(TARGET_JS)
const data = getData(TARGET_JS)

// // process.env in browser
// globalThis.process = globalThis?.process ?? {}
// globalThis.process = {
// 	env: {
// 		...globalThis.process?.env,
// 		NODE_ENV: envs?.NODE_ENV ?? 'development',
// 	},
// }

console.debug('TARGET_JS via import.meta.url', _TARGET_JS_IMPORT)
console.debug('TARGET_JS via env (fallback)', _TARGET_JS_ENV)
console.debug('TARGET_JS', TARGET_JS)
console.debug('envs', envs)
console.debug('data', data)
console.info('ヾ(⌐■_■)ノ ....')

export default app(target)
