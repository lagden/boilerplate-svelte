import envs from '../../resource/env.js'

// Cache das informações armazenadas no dataset
// const _data = new Map()
const _data = new Set()

/**
 * Carrega os dados definidos como variáveis de ambiente
 * @return {object} Retorna um objeto com as variáveis
 */
export function getEnv() {
	return envs ?? {}
}

/**
 * Retorna todos os dados definidos no data-* do elemento <script>
 * @return {object} Retorna um objeto
 */
export function getData(t) {
	if (_data.size === 1) {
		return [..._data][0]
	}

	const {TARGET_JS} = getEnv()
	const id = t ?? TARGET_JS

	const el = globalThis.document.getElementById(id)
	const o = {}
	if (el) {
		for (const [key, value] of Object.entries(el.dataset)) {
			o[key] = value
		}
	}
	_data.add(o)
	return o
}

/**
 * Define onde aplicação será renderizada
 * @return {HTMLElement} Retorna o elemento
 */
export function getTarget(t) {
	const data = getData(t)
	return globalThis.document.getElementById(data.target) ?? globalThis.document.body
}
