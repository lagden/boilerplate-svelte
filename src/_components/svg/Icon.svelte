<script>
	import {filterProps} from '../../lib/common'

	export let name = ''

	const props = filterProps($$props, ['name'])
</script>

<svg {...props} on:click>
	<use xlink:href="#{name}" />
</svg>
