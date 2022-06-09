<script>
	import Icon from '@tadashi/svelte-icon'
	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'
</script>

<Head />
<Sprite />

<Icon name="boilerplate_svelte_logo" --tadashi_svelte_icon_width="clamp(12rem, 2.2500rem + 43.3333vw, 25rem)" />
<h1 class="_boilerplate_svelte__title">
	<Icon name="boilerplate_svelte_flask" />
	<span>Boilerplate Svelte</span>
</h1>

<style lang="scss">
	._boilerplate_svelte__title {
		--tadashi_svelte_icon_width: clamp(1rem, -0.875rem + 8.333vw, 3.5rem);
		--tadashi_svelte_icon_height: clamp(1rem, -0.875rem + 8.333vw, 3.5rem);
		--tadashi_svelte_icon_fill: hsl(0deg 0% 100%);
		display: grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		grid-gap: 0.3em;
		align-items: center;
		font-size: clamp(1rem, -0.875rem + 8.333vw, 3.5rem);
	}
</style>
