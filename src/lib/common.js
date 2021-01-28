/**
 * Remove as propriedades reservadas do objeto
 * @param {object} props    - Objeto
 * @param {array}  reserved - Chaves
 * @return {object} Retorna um objeto filtrado
 */
export function filterProps(props, reserved = []) {
	return Object.keys(props).reduce((acc, cur) => {
		const isTrue = cur.includes('$$') || cur.includes('Class') || reserved.includes(cur)
		return isTrue ? acc : {...acc, [cur]: props[cur]}
	}, {})
}

/**
 * Helper para ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params() {
	const url = new URL(window.location)
	const _params = new URLSearchParams(url.search)
	return _params
}

/**
 * Helper para gerar uma url com a qs + data-*
 * @param {string} endpoint - Endereço de disparo
 * @param {object} data     - Objeto
 * @return {string} Retorna uma URL
 */
export function fullURL(endpoint, data) {
	const url = new URL(endpoint)
	const qs = params()
	let _data = {}

	for (const [k, v] of qs) {
		_data[k] = v
	}

	for (let [k, v] of Object.entries({..._data, ...data})) {
		url.searchParams.set(k, v)
	}

	return url.href
}

/**
 * Convert um Array para Objeto
 * @param {Array}  collection - Uma coleção de objetos
 * @param {string} key        - Nome do campo que será a chave
 * @return {object} Retorna o token ou false
 */
export function arr2obj(key, collection = []) {
	if (Array.isArray(collection) === false) {
		return collection
	}

	const obj = {}
	for (const data of collection) {
		obj[`_${data[key]}`] = data
	}
	return obj
}

/**
 * Helper para fazer o sort de um Array em ordem alfabética
 * @param {string} prop - Propriedade que será comparada
 * @return {function} Retorna a função de comparação
 */
export function alphaSort(prop) {
	return (a, b) => {
		if (a[prop] < b[prop]) {
			return -1
		}
		if (a[prop] > b[prop]) {
			return 1
		}
		return 0
	}
}

export function uniqueValue(...args) {
	let collection = []
	for (const v of args) {
		if (typeof v === 'string') {
			collection = [...collection, ...v.split(' ')]
		}
	}
	let unique = new Set(collection)
	return [...unique].join(' ')
}

export function findRecursive(collection, key, value) {
	for (const item of collection) {
		for (const [k, v] of Object.entries(item)) {
			if (k === key && v === value) {
				return item
			}
			if (Array.isArray(v)) {
				const _item = findRecursive(v, key, value)
				if (_item) {
					return _item
				}
			}
		}
	}
}
