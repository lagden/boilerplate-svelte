/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin.js'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				svelte: 'hsl(15deg 100% 50%)',
			},
		},
	},
	plugins: [
		// // require('@tailwindcss/forms'),
		plugin(({addUtilities}) => {
			addUtilities({
				'.items-center-safe': {'align-items': 'safe center'},
				'.justify-center-safe': {'justify-content': 'safe center'},
			})
		}),
	],
}
