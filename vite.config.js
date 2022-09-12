import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js'
import config, {ignoreWarnings as _ignoreWarnings} from './svelte.config.js'

const {
	compilerOptions,
	preprocess,
} = config

const ignoreWarnings = new Set([
	..._ignoreWarnings,
	'vite-plugin-svelte-css-no-scopable-elements',
	// 'missing-declaration',
])

export default defineConfig({
	cacheDir: './.vite',
	server: {
		hmr: true,
	},
	css: {
		postcss,
	},
	plugins: [
		svelte({
			configFile: false,
			compilerOptions,
			preprocess,
			// emitCss: true,
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
