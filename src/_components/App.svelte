<script>
	import Icon from '@tadashi/svelte-icon'
	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'

	const link = 'https://twitter.com/share?text=Svelte Boilerplate made with ❤️&url=https://github.com/lagden/boilerplate-svelte&hashtags=sveltejs,js,boilerplate'
	const content = 'Boilerplate Svelte with Tailwind'
</script>

<Head />
<Sprite />

<div class="inline-flex items-center-safe gap-4">
	<Icon name="boilerplate_svelte_logo" class="clamp_logo" />
	<span class="text-slate-50 text-2xl">+</span>
	<Icon name="boilerplate_svelte_tail" class="clamp_logo fill-sky-400" />
</div>

<h1 class="inline-flex items-center-safe gap-4 text-slate-50">
	<Icon name="boilerplate_svelte_flask" class="clamp_flask fill-svelte hover:fill-slate-50" />
	<span class="text-[clamp(1rem,_0.2500rem_+_3.3333vw,_2rem)]">{content}</span>
</h1>

<div class="relative rounded-xl overflow-auto p-8">
	<div class="grid place-items-center">
		<a href="{link}" target= "_blank" rel="noreferrer noopener" class="bg-blue-500 hover:bg-blue-800 text-white inline-flex pl-3.5 pr-4 py-3 font-medium rounded-md items-center text-sm space-x-3">
			<Icon name="boilerplate_svelte_bird" class="w-[20px] h-[20px] fill-current" />
			<span>Share on Twitter</span>
		</a>
	</div>
</div>
