import {getURL} from 'https://unpkg.com/@tadashi/common@2.1.0/src/lib/url/get-url.js'
import {getProp} from 'https://unpkg.com/@tadashi/common@2.1.0/src/lib/dom/prop.js'
import {uuid} from 'https://unpkg.com/@tadashi/common@2.1.0/src/lib/uuid.js'

function create(props, elementType) {
	const s = globalThis.document.createElement(elementType)
	const KVs = Object.entries(props)
	for (const [k, v] of KVs) {
		if (k === 'dataset') {
			for (const [dk, dv] of Object.entries(v)) {
				s[k][dk] = dv
			}
		} else {
			s[k] = v
		}
	}
	// return s
	globalThis.document.head.append(s)
}

// Load
async function load() {
	const rnd = uuid()
	const url = getURL(import.meta.url)
	const _id = getProp(import.meta.url) ?? 'boilerplate_svelte_js'

	const response = await fetch(`${url}/files.json?noCache=${rnd}`)
	const files = await response.json()

	console.debug('load', {
		url,
		_id,
		files,
		isEntry: files?.['index.html']?.isEntry,
	})

	if (files?.['index.html']?.isEntry === true) {
		const main = files?.['index.html']

		// Load css/style
		const css = main?.css ?? []
		for (const file of css) {
			console.debug('href css', `${url}/${file}?noCache=${rnd}`)
			create({
				href: `${url}/${file}?noCache=${rnd}`,
				rel: 'stylesheet',
				type: 'text/css',
			}, 'link')
		}

		// Load script
		console.debug('src main', `${url}/${main.file}?TARGET_JS=${_id}&noCache=${rnd}`)
		create({
			src: `${url}/${main.file}?TARGET_JS=${_id}&noCache=${rnd}`,
			type: 'module',
		}, 'script')
	}
}

export default await load()
