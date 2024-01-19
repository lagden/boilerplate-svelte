/** @type {import('tailwindcss').Config} */

import containerQueries from '@tailwindcss/container-queries'
import daisyui from 'daisyui'
import daisyuiThemes from 'daisyui/src/theming/themes.js'

const {winter, night} = daisyuiThemes

export default {
	// prettier-ignore
	content: [
		'./src/**/*.{svelte,html,js,ts}',
		'./node_modules/@texsvelte/**/*.{svelte,html,js,ts}',
	],
	daisyui: {
		base: false,
		logs: false,
		prefix: 'daisy-',
		themes: [
			{
				tex: {
					...winter,
					'color-scheme': 'light',
				},
			},
			{
				'tex-dark': {
					...night,
					'color-scheme': 'dark',
				},
			},
		],
	},
	theme: {
		extend: {},
	},
	plugins: [
		containerQueries,
		daisyui,
	],
}
