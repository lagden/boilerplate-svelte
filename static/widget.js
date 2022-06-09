import {uuid} from 'https://unpkg.com/@tadashi/common@1.1.0/src/common.js'

// Get target id
function getTargetId() {
	return new URL(import.meta.url).searchParams.get('id') ?? 'app_svelte_widget'
}

// Convert data-* attributes from target to object
function getData() {
	const TARGET_JS = getTargetId()
	const element = globalThis.document.getElementById(TARGET_JS)
	const data = {}
	if (element instanceof HTMLElement) {
		for (const [key, value] of Object.entries(element.dataset)) {
			data[key] = value
		}
	}
	return data
}

// Load
function load() {
	const data = getData()
	const rnd = uuid()
	const id = `app_svelte_${rnd}`

	const url = data?.url ?? '.'
	Reflect.deleteProperty(data, 'url')

	const link = globalThis.document.createElement('link')
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = `${url}/scripts/main.css?noCache=${rnd}`
	link.media = 'all'

	const script = globalThis.document.createElement('script')
	script.type = 'module'
	script.id = id
	script.src = `${url}/scripts/main.js?TARGET_JS=${id}&noCache=${rnd}`
	for (const [k, v] of Object.entries(data)) {
		script.dataset[k] = v
	}

	globalThis.document.head.append(link)
	globalThis.document.head.append(script)
}

load()
