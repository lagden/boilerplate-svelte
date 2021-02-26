<svelte:head>
	<!-- Font utilizada no projeto -->
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css?family=Lato:300,700&display=swap" rel="stylesheet">

	<!-- Normalize -->
	<link rel="preconnect" href="https://unpkg.com" crossorigin>
	<link rel="stylesheet" href="https://unpkg.com/modern-normalize@1.0.0/modern-normalize.css">

	<style type="text/css">
		html {
			background-color: hsl(216, 10%, 28%);
			height: 100%;
			overflow-x: hidden;
		}

		body {
			position: relative;
			overflow-x: hidden;
			overflow-y: auto;
			height: 100vh;
			font-family: 'Lato', sans-serif;
			font-size: 1em;
		}

		svg {
			box-sizing: content-box;
		}
	</style>

	<style>
		@import '../../_assets/sass/global';
	</style>
</svelte:head>
