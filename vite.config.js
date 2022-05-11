import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	cacheDir: './.vite',
	server: {
		hmr: true,
	},
	plugins: [
		svelte({
			emitCss: true,
		}),
	],
})
