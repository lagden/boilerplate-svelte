<script>
	import {css} from '../lib/emotion'
	import {obj2style} from '../lib/common'

	import Icon from '@tadashi/svelte-icon'
	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'

	// Exemplo via style
	const style = obj2style({
		'--tadashi_svelte_icon_width': '300px'
	})

	// Exemplo via css emotion
	const icon = css`
		width: 24px;
		height: 24px;
		fill: hsl(0deg 0% 100%);
	`
</script>

<Head />
<Sprite />

<section class="_boilerplate_svelte_wrapper">
	<Icon name="boilerplate_svelte_logo" {style} />
	<h1 class="_boilerplate_svelte_wrapper__title">
		<Icon name="boilerplate_svelte_flask" class="{icon}" />
		<span>Boilerplate Svelte</span>
	</h1>
</section>

<style lang="scss">
	@import '../_assets/sass/fn';

	._boilerplate_svelte_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1 0 auto;
		color: hsl(0deg 0% 100%);
	}

	._boilerplate_svelte_wrapper__title {
		align-items: center;
		display: inline-grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		grid-gap: 0.3em;
		text-align: center;
	}
</style>
