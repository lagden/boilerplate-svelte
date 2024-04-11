/**
 * A Set containing cached data objects.
 * @type {Set<Object>}
 * @private
 */
const _data = new Set()

/**
 * A Set containing cached render targets.
 * @type {Set<HTMLElement>}
 * @private
 */
const _target = new Set()

/**
 * Retrieves data associated with an HTML element identified by its ID.
 *
 * @param {string} [id] - The ID of the HTML element.
 * @returns {Object} An object containing data attributes of the HTML element, or an empty object if the element is not found.
 * @function
 * @exports
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
 * Retrieves the rendering target, either specified or the document body.
 *
 * @param {string} [id] - The ID of the HTML element used to obtain rendering target information.
 * @returns {HTMLElement} The rendering target element, defaulting to the document body if not specified or found.
 * @function
 * @exports
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
