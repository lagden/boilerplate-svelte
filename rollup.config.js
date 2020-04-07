import brotli from '@tadashi/rollup-plugin-brotli'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import sveltePreprocessPostcss from 'svelte-preprocess-postcss'
import svelte from 'rollup-plugin-svelte'
import envs from './rollup_plugin/envs'
import widget from './rollup_plugin/widget'
import debug from 'debug'

const {
	TARGET_JS = '_widget',
	APP_NAMESPACE = '_app',
	PUBLIC_PATH = 'http://[::1]:3000',
	NODE_ENV = 'development',
	VERSION = 'dev',
	DEBUG = '_app_default_debug:*'
} = process.env

const _log = debug(DEBUG)

_log('--> TARGET_JS', TARGET_JS)
_log('--> APP_NAMESPACE', APP_NAMESPACE)
_log('--> PUBLIC_PATH', PUBLIC_PATH)
_log('--> NODE_ENV', NODE_ENV)
_log('--> VERSION', VERSION)
_log('--> DEBUG', DEBUG)

const production = NODE_ENV === 'production'
const format = 'esm' // or 'system'

export default {
	input: ['src/main.js'],
	manualChunks: {
		emotion: [
			'emotion'
		]
	},
	output: {
		format,
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'public/scripts',
		compact: true,
		sourcemap: true
	},
	plugins: [
		envs({
			[`${APP_NAMESPACE}_TARGET_JS`]: TARGET_JS,
			[`${APP_NAMESPACE}_PUBLIC_PATH`]: PUBLIC_PATH,
			[`${APP_NAMESPACE}_NODE_ENV`]: NODE_ENV,
			[`${APP_NAMESPACE}_VERSION`]: VERSION,
			[`${APP_NAMESPACE}_DEBUG`]: DEBUG
		}, APP_NAMESPACE),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		svelte({
			dev: !production,
			preprocess: {
				style: sveltePreprocessPostcss({useConfigFile: true})
			},
			emitCss: false
		}),
		widget({
			publicPath: `${PUBLIC_PATH}/scripts`,
			output: 'widget.js',
			esm: format === 'esm'
		}),
		production && terser(),
		// use the brotli last (after all)
		production && brotli({
			additional: [
				'public/scripts/widget.js',
				'public/index.html',
				'public/main.css'
			]
		})
	],
	// inlineDynamicImports: true,
	// experimentalOptimizeChunks: true,
	watch: {
		clearScreen: false
	}
}
