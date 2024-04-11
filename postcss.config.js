import postcssImport from 'postcss-import'
import postcssScroll from 'postcss-scrollbar'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import tailwindcssConfig from './tailwind.config.js'

export default {
	// prettier-ignore
	plugins: [
		postcssImport(),
		tailwindcssNesting(),
		tailwindcss(tailwindcssConfig),
		postcssScroll(),
		autoprefixer(),
	],
}
