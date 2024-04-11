// @ts-ignore
import {getURL} from 'https://unpkg.com/@tadashi/common/src/lib/url/get-url.js'
// @ts-ignore
import {getProp} from 'https://unpkg.com/@tadashi/common/src/lib/url/prop.js'
// @ts-ignore
import {rnd as uuid} from 'https://unpkg.com/@tadashi/common/src/lib/rnd.js'
// @ts-ignore
import {createElement} from 'https://unpkg.com/@tadashi/common/src/lib/create-element.js'

function create(props, elementType) {
	const element = createElement(elementType, props)
	globalThis.document.head.append(element)
}

// Load
async function load() {
	const rnd = uuid()
	const url = getURL(import.meta.url)
	const id = getProp(import.meta.url, 'id') ?? 'boilerplate_svelte_js'

	// Informações dos pacotes
	const response = await fetch(`${url}/files.json?noCache=${rnd}`)
	const files = await response.json()

	console.debug('load', {
		url,
		id,
		files,
	})

	// Load CSS
	const cssFile = files?.['style.css']?.file ?? false
	if (cssFile) {
		create(
			{
				href: `${url}/${cssFile}?noCache=${rnd}`,
				rel: 'stylesheet',
				type: 'text/css',
				crossOrigin: 'anonymous',
			},
			'link',
		)
	}

	// Load script
	const script = files?.['index.html']
	if (script?.isEntry === true) {
		create(
			{
				src: `${url}/${script.file}?TARGET_JS=${id}&noCache=${rnd}`,
				type: 'module',
				crossOrigin: 'anonymous',
			},
			'script',
		)
	}
}

export default await load()
