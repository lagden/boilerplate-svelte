'use strict'

export default function envs(options = {}, ns = '') {
	const optionsString = JSON.stringify(options)
	return {
		name: 'envs',
		intro: () => `
window.process = window.process || {}
window.process.env = window.process.env || {}
Object.entries(${optionsString}).forEach(pair => {
	window.process.env[pair[0]] = pair[1]
})

window.process.getNS = () => '${ns}'
`
	}
}
