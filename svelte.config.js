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
	// 'missing-declaration',
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
	filterWarnings(warning) {
		// console.log('------------------>>>', JSON.stringify(warning, undefined, '  '))
		if (ignoreWarnings.has(warning.code)) {
			return false
		}
		return true
	},
}

export default config
