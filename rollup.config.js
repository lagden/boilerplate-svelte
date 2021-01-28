import brotli from '@tadashi/rollup-plugin-brotli'
import widget from '@tadashi/rollup-plugin-widget'
import envs from '@tadashi/rollup-plugin-env'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import {terser} from 'rollup-plugin-terser'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import debug from 'debug'

const {
	APP_NS = '_app',
	APP_ENV = 'development',
	NODE_ENV = 'development',
	TARGET_JS = '_widget',
	BASE_PATH = 'http://[::1]:3000',
	VERSION = 'dev',
	DEBUG = '_app_default_debug:*'
} = process.env

const _log = debug(DEBUG)
_log('--> APP_NS', APP_NS)
_log('--> TARGET_JS', TARGET_JS)
_log('--> BASE_PATH', BASE_PATH)
_log('--> NODE_ENV', NODE_ENV)
_log('--> VERSION', VERSION)
_log('--> DEBUG', DEBUG)

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
		emotion: ['@emotion/css']
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
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		envs(APP_NS, {
			APP_NS,
			APP_ENV,
			NODE_ENV,
			TARGET_JS,
			BASE_PATH,
			VERSION,
			DEBUG
		}),
		svelte({
			compilerOptions: {
				dev: !production
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				defaults: {
					style: 'scss'
				},
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
		css({
			output: 'bundle.css'
		}),
		widget({
			publicPath: `${BASE_PATH}/scripts`,
			output: 'widget.js',
			esm: format === 'es'
		}),
		production && terser({ecma: 2020}),
		production && brotli({
			additional: [
				'public/scripts/widget.js',
				'public/scripts/bundle.css',
				'public/index.html',
				'public/main.css'
			]
		})
	],
	watch: {
		clearScreen: false
	}
}
