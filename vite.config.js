import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import config from './svelte.config.js'

const {
	compilerOptions,
	preprocess,
} = config

const ignoreWarnings = new Set([
	'a11y-no-onchange',
	'a11y-label-has-associated-control',
	'css-unused-selector',
	'vite-plugin-svelte-css-no-scopable-elements',
	// 'missing-declaration',
])

export default defineConfig({
	cacheDir: './.vite',
	server: {
		hmr: true,
	},
	plugins: [
		svelte({
			configFile: false,
			compilerOptions,
			preprocess,
			emitCss: true,
			onwarn(warning, defaultHandler) {
				// console.log('>>>>>>', warning.code)
				if (ignoreWarnings.has(warning.code)) {
					return
				}
				defaultHandler(warning)
			},
			experimental: {
				prebundleSvelteLibraries: true,
			},
		}),
	],
})
