<script>
	import {css} from '../lib/emotion'
	import {getEnv} from '../lib/env'

	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'
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
	`

	const cores = {
		red: css`fill: red;`,
		orange: css`fill: orange;`,
		blue: css`fill: blue;`,
		green: css`fill: green;`
	}

	const env = getEnv()

	let showInfo = false
	let icon = 'boilerplate_svelte_check'

	function toggle() {
		showInfo = !showInfo
	}
</script>

<Head />
<Sprite />

<button type="button" class="{orange} _btn" on:click={toggle}>
	Show/Hide Info
	<Icon name="{icon}" class="{ico} {cores.red}" />
	<Icon name="{icon}" class="{ico} {cores.blue}" />
	<Icon name="{icon}" class="{ico} {cores.green}" />
</button>

{#if showInfo}
	<pre>{JSON.stringify(env, undefined, '  ')}</pre>
{/if}

<style type="text/scss">
	@import '../_assets/sass/mixin';

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
		@include mq(900px) {
			background-color: rgb(181, 255, 245);
		}
	}
</style>
