import postcssImport from 'postcss-import'
import postcssScroll from 'postcss-scrollbar'
import tailwind from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'

import {createRequire} from 'node:module'
const require = createRequire(import.meta.url)
const tailwindConfig = require('./tailwind.config.cjs')

export default {
	plugins: [
		postcssImport(),
		tailwindcssNesting(),
		tailwind(tailwindConfig),
		postcssScroll(),
	],
}
