'use strict'

const {join} = require('path')
const base = require('@tadashi/koa-base')
const www = require('koa-static')
const cc = require('koa-ctx-cache-control')
const debug = require('./lib/debug')

const regexJS = /[\w-/]+.js/i
const regexWidget = /widget.js/i

const app = base({
	error: true,
	cors: {
		credentials: true
	}
})

// Cache Control
cc(app)

app
	.use(async (ctx, next) => {
		// 7 dias
		let cacheControl = 'max-age=604800, public'

		const testJs = regexJS.test(ctx.path)

		if (testJs) {
			// 365 dias
			cacheControl = 'max-age=31536000, immutable'

			const testWidget = regexWidget.test(ctx.path)
			if (testWidget) {
				cacheControl = 'max-age=0, private, no-cache, no-store'
			}
		}
		ctx.cacheControl(cacheControl)
		await next()
	})
	.use(www(join(__dirname, '..', 'public')))
	.on('error', debug.error)

app.proxy = true

module.exports = app
