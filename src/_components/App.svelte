<script>
	import Icon from '@tadashi/svelte-icon'
	import Head from './_global/Head.svelte'
	import Sprite from './_global/Sprite.svelte'

	const link = 'https://twitter.com/share?text=Svelte Boilerplate made with ❤️&url=https://github.com/lagden/boilerplate-svelte&hashtags=sveltejs,js,boilerplate'
	const clamp_logo = 'clamp(10rem,_2rem_+_40vw,_25rem)'
	const clamp_flask = 'clamp(1rem,_-0.875rem_+_8.333vw,_3.5rem)'
</script>

<Head />
<Sprite />

<Icon name="boilerplate_svelte_logo" class="w-[{clamp_logo}] h-[{clamp_logo}]" />

<h1 class="inline-flex items-center-safe gap-4 text-slate-50">
	<Icon name="boilerplate_svelte_flask" class="w-[{clamp_flask}] h-[{clamp_flask}] fill-svelte hover:fill-slate-50" />
	<span class="text-[clamp(1rem,_-0.875rem_+_8.333vw,_3.5rem)]">Boilerplate Svelte</span>
</h1>

<div class="relative rounded-xl overflow-auto p-8">
	<div class="grid place-items-center">
		<a href="{link}" target= "_blank" rel="noreferrer noopener" class="bg-blue-500 hover:bg-blue-800 text-white inline-flex pl-3.5 pr-4 py-3 font-medium rounded-md items-center text-sm space-x-3">
			<Icon name="boilerplate_svelte_bird" class="w-[20px] h-[20px] fill-current" />
			<span>Share on Twitter</span>
		</a>
	</div>
</div>
