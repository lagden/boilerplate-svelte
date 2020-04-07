<script>
	import {css} from '../lib/emotion'
	import {loadEnv} from '../lib/common.js'

	import Sprite from './svg/Sprite.svelte'
	import Icon from './svg/Icon.svelte'

	const orange = css`
		--hue: 30;
		--button-background-color: hsl(var(--hue), 110%, 16%);
		--button-text-color: hsl(var(--hue), 151%, 63%);
		--button-font-size: 1em;
	`

	const ico = css`
		width: 24px;
		height: 24px;
		fill: red;
	`

	const env = loadEnv()

	let showInfo = false
	let icon = 'svelte_app_ico_check'

	function toggle() {
		showInfo = !showInfo
	}
</script>

<Sprite />

<button type="button" class="{orange} _btn" on:click={toggle}>
	Show/Hide Info
	<Icon name="{icon}" class="{ico}" />
</button>

{#if showInfo}
	<pre>{JSON.stringify(env, null, '  ')}</pre>
{/if}

<style type="text/css" postcss>
	._btn {
		background-color: var(--button-background-color);
		border: 0;
		box-sizing: border-box;
		color: var(--button-text-color);
		cursor: pointer;
		font-size: var(--button-font-size);
		font-weight: 300;
		outline: 0;
		overflow: hidden;
		padding: 0.8em 4em;
		position: relative;
	}
</style>
