<script>
	import {css} from '../lib/emotion'

	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'
	import Icon from './svg/Icon.svelte'

	const ico = css`
		width: 300px;
		height: auto;
	`
</script>

<Head />
<Sprite />

<section class="_boilerplate_svelte_wrapper">
	<Icon name="boilerplate_svelte_logo" class="{ico}" />
	<h1 class="_boilerplate_svelte_wrapper__title">Boilerplate Svelte</h1>
</section>

<style lang="scss">
	@import '../_assets/sass/fn';
	@import '../_assets/sass/mixin';

	._boilerplate_svelte_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1 0 auto;
		color: hsl(0deg 0% 100%);
	}

	._boilerplate_svelte_wrapper__title {
		text-align: center;
	}
</style>
