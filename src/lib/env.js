import envs from '../../resource/env.js'

// Cache das informações armazenadas no dataset
const _data = new Set()

/**
 * Carrega os dados definidos como variáveis de ambiente
 * @return {object} Retorna um objeto com as variáveis
 */
export function getEnv() {
	return envs ?? {}
}

/**
 * Retorna todos os dados definidos no data-* do elemento
 * @param {string} id - ID do elemento
 * @return {object} Retorna um objeto
 */
export function getData(id) {
	// Retorna o cache
	if (_data.size === 1) {
		return [..._data][0]
	}

	const el = globalThis.document.getElementById(id)
	const o = {}
	if (el) {
		for (const [key, value] of Object.entries(el.dataset)) {
			o[key] = value
		}
		o.elementID = id
		_data.add(o)
	}

	return o
}

/**
 * Define onde aplicação será renderizada
 * @param {string} id - ID do elemento
 * @return {HTMLElement} Retorna o elemento
 */
export function getRender(id) {
	const data = getData(id)
	return globalThis.document.getElementById(data.target) ?? globalThis.document.body
}
