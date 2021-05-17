<script>
	export let name
	export let useCssVarProp = false
</script>

<svg
	class:_template_icon___color={useCssVarProp}
	on:click
	{...$$restProps}
><use xlink:href="#{name}" /></svg>

<style lang="scss">
	@import '../../_assets/sass/fn';

	._template_icon___color {
		fill: var(--template_icon_fill, hsl(0deg 0% 0%));
	}
</style>
