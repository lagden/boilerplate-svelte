<script>
	export let name
</script>

<svg
	on:click
	{...$$restProps}
><use xlink:href="#{name}" /></svg>
