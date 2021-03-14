<script>
	export let name
</script>

<svg {...$$restProps} on:click>
	<use xlink:href="#{name}" />
</svg>
