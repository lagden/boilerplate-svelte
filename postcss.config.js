'use strict'

const {
	NODE_ENV = 'development'
} = process.env

const production = NODE_ENV === 'production'

module.exports = () => ({
	parser: false,
	map: !production,
	plugins: {
		'postcss-easy-import': {},
		'postcss-mixins': {},
		'postcss-conditionals': {},
		'postcss-simple-vars': {},
		'postcss-functions': {
			functions: {
				em(px, base = 16) {
					const n = Number(px.replace(/\D/g, ''))
					return `${n / base}em`
				}
			}
		},
		'postcss-nested': {},
		autoprefixer: {}
	}
})
