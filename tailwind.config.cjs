/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin.js')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	// prefix: 'tw-',
	theme: {
		// extend: {
		// 	colors: {
		// 		svelte: 'hsl(15deg 100% 50%)',
		// 	},
		// },
	},
	plugins: [
		// // require('@tailwindcss/forms'),
		plugin(({addUtilities}) => {
			addUtilities({
				'.items-center-safe': {'align-items': 'safe center'},
				'.justify-center-safe': {'justify-content': 'safe center'},
				'.h-auto': {height: 'auto'},
				'.custom-scrollbar': {
					'scrollbar-gutter': 'stable',
					'scrollbar-width': 'thin',
					'scrollbar-color': '#999 transparent',
				},
			})
		}),
	],
}
