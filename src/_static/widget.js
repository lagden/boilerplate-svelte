import {getURL} from 'https://service.teleport.com.br/cors/v1/load/?url=https://unpkg.com/@tadashi/common@3.2.0/src/lib/url/get-url.js'
import {getProp} from 'https://service.teleport.com.br/cors/v1/load/?url=https://unpkg.com/@tadashi/common@3.2.0/src/lib/dom/prop.js'
import {rnd as uuid} from 'https://service.teleport.com.br/cors/v1/load/?url=https://unpkg.com/@tadashi/common@3.2.0/src/lib/rnd.js'
import {createElement} from 'https://service.teleport.com.br/cors/v1/load/?url=https://unpkg.com/@tadashi/common@3.2.0/src/lib/create-element.js'

function create(props, elementType) {
	const element = createElement(elementType, props)
	globalThis.document.head.append(element)
}

// Load
async function load() {
	const rnd = uuid()
	const url = getURL(import.meta.url)
	const id = getProp(import.meta.url) ?? 'boilerplate_svelte_js'

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
		create({
			href: `${url}/${cssFile}?noCache=${rnd}`,
			rel: 'stylesheet',
			type: 'text/css',
		}, 'link')
	}

	// Load script
	const script = files?.['index.html']
	if (script?.isEntry === true) {
		create({
			src: `${url}/${script.file}?TARGET_JS=${id}&noCache=${rnd}`,
			type: 'module',
		}, 'script')
	}
}

export default await load()
