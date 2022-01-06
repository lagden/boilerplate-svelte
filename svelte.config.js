import autoprefixer from 'autoprefixer'
import preprocess from 'svelte-preprocess'
import envs from './resource/env.js'

const {
	NODE_ENV = 'development',
} = envs

const production = NODE_ENV === 'production'

const ignoreWarnings = new Set([
	'a11y-no-onchange',
	'a11y-label-has-associated-control',
	'css-unused-selector',
])

const config = {
	compilerOptions: {
		dev: !production,
	},
	preprocess: preprocess({
		sourceMap: !production,
		postcss: {
			plugins: [
				autoprefixer(),
			],
		},
	}),
	extensions: ['.svelte'],
	onwarn(warning, handler) {
		// console.log('warning.code', warning.code)
		if (ignoreWarnings.has(warning.code)) {
			return
		}
		handler(warning)
	},
}

export default config
