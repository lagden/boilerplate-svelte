/**
 * Provides the ability to reference external css/js files for the generated html
 * Method source once issues: https://github.com/rollup/plugins/issues/755
 * @param {Array} externals List of external files.
 *   The format is: [{ type: 'js', file: '//xxxx1.js', pos: 'before' }, { type: 'css', file: '//xxxx1.css' }]
 *
 * @return {Function} The templae method required by plugin-html
 */
export default function htmlTemplate(externals) {
	return ({attributes, files, meta, publicPath, title}) => {
		let scripts = [...(files.js || [])]
		let links = [...(files.css || [])]

		// externals = [{ type: 'js', file: '//xxxx1.js', pos: 'before' }, { type: 'css', file: '//xxxx1.css' }]
		if (Array.isArray(externals)) {
			const beforeLinks = []
			const beforeScripts = []
			for (const node of externals) {
				let fileList
				const isCssFile = node.type === 'css'
				if (node.pos === 'before') {
					fileList = isCssFile ? beforeLinks : beforeScripts
				} else {
					fileList = isCssFile ? links : scripts
				}
				fileList.push({fileName: node.file})
			}
			scripts = [...beforeScripts, ...scripts]
			links = [...beforeLinks, ...links]
		}

		scripts = scripts.map(({fileName}) => {
			const attrs = makeHtmlAttributes(attributes.script)
			return `<script src="${publicPath}${fileName}"${attrs}></script>`
		}).join('\n')

		links = links.map(({fileName}) => {
			const attrs = makeHtmlAttributes(attributes.link)
			return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`
		}).join('\n')

		const metas = meta
			.map(input => {
				const attrs = makeHtmlAttributes(input)
				return `<meta${attrs}>`
			})
			.join('\n')

		return `<!DOCTYPE html>
<html${makeHtmlAttributes(attributes.html)}>
	<head>
		${metas}
		<title>${title}</title>
		${links}
		${scripts}
	</head>
	<body>
	</body>
</html>`
	}
}

function makeHtmlAttributes(attributes) {
	if (!attributes) {
		return ''
	}

	const keys = Object.keys(attributes)
	return keys.reduce((result, key) => {
		result += ` ${key}="${attributes[key]}"`
		return result
	}, '')
}
