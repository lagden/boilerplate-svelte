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
 * Helper copia um objeto evitando referência
 * @param {object} v - Objeto que será copiado
 * @return {object} Retorna o objeto
 */
export function copyObject(obj) {
	return JSON.parse(JSON.stringify(obj))
}

/**
 * Helper converte um valor para número
 * @param {*} v - Valor que será convertido para número
 * @return {(number|string)} Se sucesso retorna o número
 */
export function parseNumbers(v) {
	const regex = /^\d+\.(0+)?$/
	if (regex.test(v)) {
		return v
	}

	const value = Number(v)
	if (Number.isNaN(value)) {
		return v
	}

	return value
}

/**
 * Helper converte um valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @return {(boolean|string)} Se sucesso retorna o boolean
 */
export function parseBooleans(v) {
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(v)) {
		v = v.toLowerCase() === 'true' || v === '1'
	}
	return v
}

export function parses(parse) {
	const opts = {
		number: parseNumbers,
		boolean: parseBooleans,
	}

	return opts[parse]
}

/**
 * Helper para evitar problema com eslint "unused"
 */
export function noop() {}

/**
 * Verifica se a variável é um Array
 * @param {array}   data         - variável
 * @param {boolean} [empty=true] - se falso, verifica se a variável contém dados
 * @return {boolean} Retorna true ou false
 */
export function checkArray(data, empty = true) {
	const isArray = data && Array.isArray(data)
	if (empty) {
		return isArray
	}
	return isArray && data.length > 0
}

/**
 * Helper para converter objeto em string
 * @param {object}  data
 * @return {string} Retorna as propriedades
 */
export function obj2style(data) {
	const style = new Set()
	for (const [k, v] of Object.entries(data)) {
		style.add(`${k}: ${v}`)
	}
	return [...style].join(';')
}
