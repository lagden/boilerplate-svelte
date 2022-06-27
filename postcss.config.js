import tailwind from 'tailwindcss'
// import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config.js'

export default {
	plugins: [
		// postcssImport(),
		tailwind(tailwindConfig),
		autoprefixer(),
	],
}
