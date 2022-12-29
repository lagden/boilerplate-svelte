import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	base: './',
	cacheDir: '.vite',
	server: {
		hmr: true,
	},
	publicDir: 'src/_static',
	build: {
		target: 'es2022',
		modulePreload: false,
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets',
		manifest: 'files.json',
		sourcemap: false,
		minify: 'esbuild',
		// minify: false,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				format: 'es',
				compact: true,
				entryFileNames: 'assets/main.js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
	plugins: [
		svelte({
			configFile: 'svelte.config.js',
			prebundleSvelteLibraries: true,
		}),
	],
})
