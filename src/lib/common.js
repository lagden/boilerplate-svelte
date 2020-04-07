/**
 * Carrega os dados básicos passados como variáveis de ambiente
 * @return {object} Retorna um objeto com as variáveis
 */
export function loadEnv() {
	const APP_NAMESPACE = window.process.getNS()
	const {
		[`${APP_NAMESPACE}_TARGET_JS`]: TARGET_JS,
		[`${APP_NAMESPACE}_PUBLIC_PATH`]: PUBLIC_PATH,
		[`${APP_NAMESPACE}_VERSION`]: VERSION
	} = window.process.env
	return {
		APP_NAMESPACE,
		TARGET_JS,
		PUBLIC_PATH,
		VERSION
	}
}

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
 * Cancela subscrição (deve ser chamado antes de destruir o componente)
 * @param {Set[]} unsubscribes - Coleção de método para o cancelamento da subscrição
 */
export function destroy(unsubscribes) {
	for (const unsubscribe of unsubscribes) {
		unsubscribe()
	}
	unsubscribes.clear()
	unsubscribes = null
}

/**
 * Armazena todos data-* em um namespace do objeto window
 * @param {Set[]} unsubscribes - Coleção de método para o cancelamento da subscrição
 * @param {Set[]} unsubscribes - Coleção de método para o cancelamento da subscrição
 */
export function _globals(name, el) {
	window[name] = Object.create(null)
	for (let [key, value] of Object.entries(el.dataset)) {
		window[name][key] = value
	}
}

/**
 * Configura o alvo no qual a aplicação será renderizada e namespace para ler as informações armazenadas no dataset
 * @param {string} scriptTagID - ID da tag <script>
 * @return {object} Retorna um objeto com o target e namespace
 */
export function _target(scriptTagID) {
	let namespace = '_svelte_app'
	let target = document.body
	const scriptTag = document.querySelector(`#${scriptTagID}`)
	if (scriptTag) {
		namespace = scriptTag.dataset.namespace || namespace
		_globals(namespace, scriptTag)
		if (window[namespace] && window[namespace].target) {
			target = document.querySelector(`#${window[namespace].target}`) || target
		}
	}
	return {target, namespace}
}
