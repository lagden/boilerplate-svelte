<script>
import * as IconsHero from '@steeze-ui/heroicons'
import {Icon} from '@steeze-ui/svelte-icon'
import {spring} from 'svelte/motion'
import {pannable} from './pannable.js'

const coords = spring(
	{
		x: 0,
		y: 0,
	},
	{
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

<div
	class="absolute m-auto inset-x-auto inset-y-auto cursor-move"
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="transform: translate({$coords.x}px,{$coords.y}px) rotate({$coords.x * 0.2}deg)"
>
	<Icon
		src={IconsHero.GlobeAlt}
		size="200"
		class="text-emerald-500"
	/>
</div>
