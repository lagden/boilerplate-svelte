import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	base: './',
	cacheDir: '.vite',
	server: {
		hmr: true,
	},
	envPrefix: 'APP_',
	publicDir: 'src/_static',
	build: {
		target: 'es2022',
		modulePreload: false,
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'scripts',
		manifest: 'files.json',
		sourcemap: false,
		minify: 'esbuild',
		// minify: false,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				format: 'es',
				compact: true,
				entryFileNames: 'scripts/entry.js',
				chunkFileNames: 'scripts/chunk-[name]-[hash].js',
				assetFileNames: 'scripts/[name].[ext]',
				manualChunks: {
					app: ['src/app.js'],
				},
			},
			// minChunkSize: 5000,
		},
	},
	plugins: [
		svelte({
			configFile: 'svelte.config.js',
			prebundleSvelteLibraries: true,
		}),
	],
})
