const _data = new Set()
const _target = new Set()

/**
 * Retrieves data from the cache or an HTML element.
 * @param {...string} args - The arguments passed to the function. Only the first argument is used as the ID of the HTML element.
 * @returns {Object} The retrieved data object.
 */
export function getData(...args) {
	// Cache
	if (_data.size === 1) {
		return [..._data][0]
	}

	const [id] = args
	const o = {}

	if (id) {
		const el = globalThis.document.getElementById(id)
		if (el) {
			for (const [key, value] of Object.entries(el.dataset)) {
				o[key] = value
			}
			o.elementID = id
			_data.add(o)
		}
	}
	return o
}

/**
 * Retrieves the HTML element to render based on the provided ID.
 * @param {...string} args - The arguments passed to the function. Only the first argument is used as the ID.
 * @returns {HTMLElement} The HTML element to render.
 */
export function getRender(...args) {
	// Cache
	if (_target.size === 1) {
		return [..._target][0]
	}

	const [id] = args
	const data = getData(id)
	const target = globalThis.document.getElementById(data.target) ?? globalThis.document.body
	_target.add(target)
	return target
}
