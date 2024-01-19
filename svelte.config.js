import process from 'node:process'
import sveltePreprocess from 'svelte-preprocess'
import postcss from './postcss.config.js'

const {NODE_ENV = 'development'} = process.env

const production = NODE_ENV === 'production'

export const ignoreWarnings = new Set([
	'a11y-no-onchange',
	'a11y-label-has-associated-control',
	'a11y-click-events-have-key-events',
	// 'vite-plugin-svelte-css-no-scopable-elements',
	// 'css-unused-selector',
	// 'missing-declaration',
])

export default {
	compilerOptions: {
		dev: !production,
	},
	preprocess: sveltePreprocess({
		sourceMap: !production,
		postcss,
	}),
	// vite/rollup
	onwarn(warning, handler) {
		// console.log('------------------>>>', 'warning.code', warning.code)
		if (ignoreWarnings.has(warning.code)) {
			return
		}
		handler(warning)
	},
	// esbuild
	filterWarnings(warning) {
		// console.log('------------------>>>', JSON.stringify(warning, undefined, '  '))
		return !ignoreWarnings.has(warning.code)
	},
}
