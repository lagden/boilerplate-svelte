import {getProp} from '@tadashi/common'
import {getEnv} from './lib/env.js'
import {getRender, getData} from './lib/dom.js'
import {app} from './app.js'

const envs = getEnv()

const _TARGET_JS_IMPORT = getProp(import.meta.url, 'TARGET_JS')
const _TARGET_JS_ENV = envs?.VITE_APP_TARGET_JS
const TARGET_JS = _TARGET_JS_IMPORT ?? _TARGET_JS_ENV ?? ''

const target = getRender(TARGET_JS)
const data = getData(TARGET_JS)

// Apply the theme - see tailwind.config.js
target.dataset.theme = 'tex-dark'

console.debug('TARGET_JS', TARGET_JS)
console.table(envs)
console.table(data)

export default app(target)
