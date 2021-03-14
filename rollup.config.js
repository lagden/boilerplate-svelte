import brotli from '@tadashi/rollup-plugin-brotli'
import widget from '@tadashi/rollup-plugin-widget'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import {terser} from 'rollup-plugin-terser'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import envs from './resource/env.js'

const {
	NODE_ENV = 'development'
} = process.env

const {
	BASE_URL = ''
} = envs

const ignoreWarnings = new Set([
	'a11y-no-onchange',
	'a11y-label-has-associated-control',
	'css-unused-selector'
])
const production = NODE_ENV === 'production'
const format = 'es' // or 'system'

export default {
	input: ['src/main.js'],
	manualChunks: {
		emotion_css: ['@emotion/css']
	},
	output: {
		format,
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'public/scripts',
		compact: true,
		sourcemap: false
	},
	plugins: [
		commonjs(),
		svelte({
			compilerOptions: {
				dev: !production
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
					plugins: [
						require('autoprefixer')()
					]
				}
			}),
			emitCss: true,
			onwarn(warning, handler) {
				// console.log('warning.code', warning.code)
				if (ignoreWarnings.has(warning.code)) {
					return
				}
				handler(warning)
			}
		}),
		css({output: 'bundle.css'}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		widget({
			publicPath: `${BASE_URL}/scripts`,
			output: 'widget.js',
			es: format === 'es',
			nodeEnv: NODE_ENV
		}),
		production && terser({ecma: 2020}),
		production && brotli({
			additional: [
				'public/scripts/widget.js',
				'public/scripts/bundle.css',
				'public/index.html'
			]
		})
	]
}
