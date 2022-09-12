import postcssImport from 'postcss-import'
import postcssScroll from 'postcss-scrollbar'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import tailwindConfig from './tailwind.config.js'

export default {
	plugins: [
		postcssImport(),
		tailwindcssNesting(),
		tailwind(tailwindConfig),
		postcssScroll(),
		autoprefixer(),
	],
}
