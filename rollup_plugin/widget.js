'use strict'

import fs from 'fs'
import {join, dirname} from 'path'

function _snippet(jss, _module) {
	if (_module) {
		return `${jss.filter(js => js.isEntry).map(js => `import('${js.path}');`).join('\n')}`
	}

	return `;(() => {
		const systemJsLoaderTag = document.createElement('script')
		systemJsLoaderTag.src = 'https://unpkg.com/systemjs@6.2.6/dist/s.min.js'
		systemJsLoaderTag.addEventListener('load', () => {
			${jss.map(js => `System.import('${js.path}');`).join('\n')}
		})
		document.head.insertBefore(systemJsLoaderTag, document.head.lastChild)
	})();`
}

export default function widget(options = {}) {
	let _dir = ''
	options = {
		output: 'widget.js',
		additional: [],
		publicPath: '.',
		esm: false,
		...options
	}
	return {
		name: 'widget',
		generateBundle(opts) {
			_dir = (opts.file && dirname(opts.file)) || opts.dir || ''
		},
		writeBundle(opts, bundle) {
			const bundleList = Object.keys(bundle)
				.filter(f => !bundle[f].isDynamicEntry)
				.map(f => ({
					isEntry: bundle[f].isEntry,
					path: `${options.publicPath}/${f}`
				}))
			const files = [
				...options.additional,
				...bundleList
			]
			const stream = fs.createWriteStream(join(_dir, options.output))
			stream.end(_snippet(files, options.esm))
		}
	}
}
