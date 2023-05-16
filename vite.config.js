import process from 'node:process'
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {createHtmlPlugin} from 'vite-plugin-html'

const {
	PUBLIC_DIR: outDir = 'dist',
	APP_BASE = '/',
	APP_TITLE = 'Boilerplate',
	APP_DESCRIPTION = 'Apenas um show',
	APP_TARGET_JS = 'boilerplate_js',
} = process.env

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
		outDir,
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
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					base: APP_BASE,
					title: APP_TITLE,
					description: APP_DESCRIPTION,
					target_js: APP_TARGET_JS,
				},
				ejsOptions: {
					openDelimiter: '{',
					closeDelimiter: '}',
				},
			},
		}),
	],
})
