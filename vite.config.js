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
		sourcemap: true,
		minify: 'esbuild',
		// minify: false,
		rollupOptions: {
			output: {
				format: 'es',
				compact: true,
				entryFileNames: 'assets/main.js',
				chunkFileNames: 'assets/bundle_[hash].js',
				assetFileNames: 'assets/bundle_[hash].[ext]',
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
