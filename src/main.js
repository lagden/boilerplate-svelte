import {loadEnv, _target} from './lib/common.js'
import App from './_components/App.svelte'

const {
	APP_NAMESPACE,
	TARGET_JS,
	PUBLIC_PATH,
	VERSION
} = loadEnv()

const {
	target,
	namespace
} = _target(TARGET_JS)

window.__data_ns = {
	[APP_NAMESPACE]: namespace
}

const app = new App({
	target
})

console.info('app_namespace', APP_NAMESPACE)
console.info('target_js', TARGET_JS)
console.info('version', VERSION)
console.info('public_path', PUBLIC_PATH)

// Workaround para mudar os hash do build
console.info('---_')


export default app
