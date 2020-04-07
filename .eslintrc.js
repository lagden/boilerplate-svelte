'use strict'

module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true
	},
	plugins: [
		'svelte3'
	],
	extends: [
		'xo',
		'plugin:unicorn/recommended'
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'no-multiple-empty-lines': ['error', {max: 2, maxBOF: 2, maxEOF: 0}],
		'no-unused-expressions': ['error', {'allowShortCircuit': true }],
		'no-console': 0,
		'camelcase': 0,
		'capitalized-comments': 0,
		'spaced-comment': 0,
		'unicorn/filename-case': 0,
		'unicorn/prevent-abbreviations': 0,
		'padding-line-between-statements': 0,
		// Bug no ctx.body Koa
		'require-atomic-updates': 0
	},
	settings: {
		'svelte3/ignore-styles': attributes => attributes.postcss
	}
}
