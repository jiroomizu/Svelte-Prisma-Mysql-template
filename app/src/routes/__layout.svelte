<script lang="ts">
	import { config } from '../app.config';
	import Paragraph from '$lib/Paragraph.svelte';
</script>

<header class="header">
	<h1 class="header__title">{config.siteName}</h1>
	<cite class="header__cite">{config.shortDesc}</cite>
</header>

<main class="main">
	<slot />
</main>
<footer class="footer">
	<Paragraph
		modifier="small"
		content="About copyright: This website has almost no content itself, so if anyone
        wants to ask me about it, please <a href='mailto:{config.userEmail}'
          >contact me.</a
        >"
	/>
</footer>

<style lang="scss">
	:global {
		color: #ddd;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		text-align: left;
	}

	:global(html),
	:global(body) {
		background: #658581;
		margin: 0;
		min-height: 20rem;
		padding: 0;
	}

	:global(a) {
		color: #fff;
	}

	:global(.wrapper) {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: 0;
		min-height: 100vh;
		padding: 0;
		position: relative;
	}

	.main {
		align-items: center;
		display: flex;
		flex-direction: column;
		max-width: calc(100vw - 4rem);
		padding: 0;
		position: relative;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	.header {
		color: #fff;
		line-height: 1.1;
		margin: 7rem auto 3rem;
		max-width: 18rem;
		text-align: left;
		white-space: initial;
		.header__title {
			font-size: 2.7rem;
			font-weight: 100;
			margin: 0 auto 0.5rem;
			text-align: left;
			white-space: pre-wrap;
		}

		.header__cite {
			font-size: 1.1rem;
			font-weight: 200;
			letter-spacing: 0.03rem;
			line-height: 1.4;
		}
	}

	.footer {
		margin: 3rem 1rem 0;
		position: sticky;
		top: calc(100vh);
	}

	@media (min-width: 480px) {
		.header {
			margin: 8rem auto 4rem;
			max-width: none;
			text-align: center;
			white-space: normal;
			.header__title {
				font-size: 5rem;
			}

			.header__cite {
				font-size: 1.6rem;
				letter-spacing: 0.03rem;
			}
		}

		.footer {
			margin: 5rem 4rem 0;
			text-align: center;
		}
	}
</style>
