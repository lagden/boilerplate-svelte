import {getTarget, getEnv} from './lib/env'

import App from './_components/App.svelte'

const target = getTarget()
const envs = getEnv()

console.debug('envs', envs)
console.info('ヾ(⌐■_■)ノ ....')

const app = new App({target})

export default app
