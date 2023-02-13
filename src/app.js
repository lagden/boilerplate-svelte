import './_assets/css/tailwind.css'
import App from './_components/App.svelte'

export function app(target) {
	return new App({target})
}
