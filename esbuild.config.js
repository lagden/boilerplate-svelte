#!/usr/bin/env node

import esbuild from 'esbuild'
import esbuildSvelte from 'esbuild-svelte'
import postcssPlugin from 'esbuild-style-plugin'
import config from './svelte.config.js'
import postcss from './postcss.config.js'

console.time('build')

try {
	const result = await esbuild.build({
		entryPoints: ['src/main.js'],
		bundle: true,
		sourcemap: true,
		minify: true,
		splitting: true,
		format: 'esm',
		outdir: './public/scripts',
		target: ['es2022'],
		plugins: [
			esbuildSvelte(config),
			postcssPlugin({postcss}),
		],
	})
	console.log(result)
} catch (error) {
	console.error(error)
	process.exit(1)
} finally {
	console.timeEnd('build')
}
