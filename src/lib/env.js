/* eslint unicorn/prefer-query-selector: 0 */

// Namespace da aplicação
// A mesma que foi definida no .env-base
const APP_NS = 'boilerplate_svelte'

// Cache das informações armazenadas no dataset
const _data = new Map()

/**
 * Carrega os dados definidos como variáveis de ambiente
 * @return {object} Retorna um objeto com as variáveis
 */
export function getEnv() {
	return globalThis.process?.env?.[APP_NS] ?? {}
}

/**
 * Retorna todos os dados definidos no data-* do elemento <script>
 * @return {object} Retorna um objeto
 */
export function getData() {
	const {TARGET_JS} = getEnv()
	if (_data.has(TARGET_JS)) {
		return _data.get(TARGET_JS)
	}
	const el = document.getElementById(TARGET_JS)
	const o = {}
	if (el) {
		for (let [key, value] of Object.entries(el.dataset)) {
			o[key] = value
		}
	}
	_data.set(TARGET_JS, o)
	return o
}

/**
 * Define onde aplicação será renderizada
 * @return {HTMLElement} Retorna o elemento
 */
export function getTarget() {
	const data = getData()
	return document.getElementById(data.target) ?? document.body
}
