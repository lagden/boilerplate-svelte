import {getProp} from '@tadashi/common'
import {getEnv} from './lib/env.js'
import {getRender, getData} from './lib/util.js'
import {app} from './app.js'

const envs = getEnv()

const _TARGET_JS_IMPORT = getProp(import.meta.url, 'TARGET_JS')
const _TARGET_JS_ENV = envs?.VITE_APP_TARGET_JS
const TARGET_JS = _TARGET_JS_IMPORT ?? _TARGET_JS_ENV ?? ''

const target = getRender(TARGET_JS)
const data = getData(TARGET_JS)

console.debug('TARGET_JS', TARGET_JS)
console.table(envs)
console.table(data)

export default app(target)
