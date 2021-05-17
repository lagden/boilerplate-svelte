/**
 * Ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params() {
	const url = new URL(window.location)
	const _params = new URLSearchParams(url.search)
	return _params
}

/**
 * Transforma a query string em objeto
 * @return {object} Retorna um objeto
 */
export function qs() {
	const _data = {}
	for (const [k, v] of params()) {
		_data[k] = v
	}
	return _data
}

/**
 * Gera uma url com a qs + data-*
 * @param {string} endpoint - Endereço de disparo
 * @param {object} data     - Objeto
 * @return {string} Retorna uma URL
 */
export function fullURL(endpoint, data = {}) {
	const url = new URL(endpoint)
	const _qs = qs()

	for (const [k, v] of Object.entries({..._qs, ...data})) {
		url.searchParams.set(k, v)
	}

	return url.href
}

/**
 * Convert um Array para Objeto
 * @param {Array}  collection - Uma coleção de objetos
 * @param {string} key        - Nome do campo que será a chave
 * @return {object} Retorna o objeto
 */
export function arr2obj(key, collection = []) {
	if (Array.isArray(collection) === false) {
		return collection
	}

	const obj = {}
	for (const data of collection) {
		obj[data[key]] = data
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
	const unique = new Set(collection)
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

export function copyObject(obj) {
	return JSON.parse(JSON.stringify(obj))
}
