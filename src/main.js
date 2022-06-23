import {getTarget, getEnv} from './lib/env.js'

import './_assets/css/app.css'

import App from './_components/App.svelte'

const TARGET_JS = new URL(import.meta.url).searchParams.get('TARGET_JS')
const target = getTarget(TARGET_JS)
const envs = getEnv()

console.debug('TARGET_JS via import.meta.url', TARGET_JS)
console.debug('envs', envs)
console.info('ヾ(⌐■_■)ノ ....')

const app = new App({target})

export default app
