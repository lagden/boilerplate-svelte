import brotli from '@tadashi/rollup-plugin-brotli'
import widget from '@tadashi/rollup-plugin-widget'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import html from '@rollup/plugin-html'
// import sri from 'rollup-plugin-sri'
import css from 'rollup-plugin-css-only'
import {terser} from 'rollup-plugin-terser'
import svelte from 'rollup-plugin-svelte'
import config from './svelte.config.js'
import envs from './resource/env.js'

const {
	NODE_ENV = 'development',
} = process.env

const {
	BASE_URL = '',
} = envs

const production = NODE_ENV === 'production'
const format = 'es' // or 'system'

export default {
	input: ['src/main.js'],
	manualChunks: {
		emotion_css: ['@emotion/css'],
	},
	output: {
		format,
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'public/scripts',
		compact: true,
		sourcemap: false,
	},
	plugins: [
		commonjs(),
		svelte(config),
		css({output: 'bundle.css'}),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		widget({
			publicPath: `${BASE_URL}/scripts`,
			output: 'widget.js',
			es: format === 'es',
			nodeEnv: NODE_ENV,
		}),
		production && terser({ecma: 2020}),
		production && brotli({
			additional: [
				'public/scripts/widget.js',
				'public/scripts/bundle.css',
				// 'public/index.html',
			],
		}),
		// production && html({
		// 	publicPath: 'public/scripts/',
		// 	fileName: 'xxx.html',
		// }),
		// production && sri({
		// 	publicPath: 'public/scripts/',
		// }),
	],
}
