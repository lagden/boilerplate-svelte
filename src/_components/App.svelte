<script>
	import {spring} from 'svelte/motion'
	import {pannable} from '../lib/pannable.js'

	import Icon from './_global/Icon.svelte'
	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'

	const coords = spring(
		{
			x: 0,
			y: 0,
		}, {
			stiffness: 0.2,
			damping: 0.4,
		},
	)

	function handlePanStart() {
		coords.stiffness = coords.damping = 1
	}

	function handlePanMove(event) {
		coords.update($coords => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy,
		}))
	}

	function handlePanEnd() {
		coords.stiffness = 0.2
		coords.damping = 0.4
		coords.set({x: 0, y: 0})
	}
</script>

<Head />
<Sprite />

<div class="box"
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="transform:
		translate({$coords.x}px,{$coords.y}px)
		rotate({$coords.x * 0.2}deg)"
>
	<Icon name="boilerplate_svelte_logo" class="clamp_logo drop-shadow-2xl" />
</div>

<style>
	.box {
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: hsl(20deg 60% 60%/0.1);
		cursor: move;
	}

	:global(.clamp_logo) {
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: auto;
		--clamp: clamp(5rem, 1.2500rem + 16.6667vw, 10rem);
		@apply w-[var(--clamp)] h-[var(--clamp)];
	}
</style>
