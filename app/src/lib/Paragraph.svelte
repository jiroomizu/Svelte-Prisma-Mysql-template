<script lang="ts">
	export let modifier: string = '';
	export let content: string = '';
	let paraClass: string = !!modifier ? `para para--${modifier}` : 'para';
</script>

<p class={paraClass}>
	{@html content}
</p>

<style lang="scss">
	.para {
		color: #eee;
		font-size: 1.4rem;
		font-weight: 300;
    letter-spacing: .015rem;
    line-height: 1.35;
		margin: 0.5rem auto 0.5rem;
	}
	.para--small {
		font-size: 1rem;
	}

	.para--narrow {
		margin: 0.5rem 1rem 1rem;
	}

	@media (min-width: 480px) {
		.para--narrow {
			margin: 0.5rem 5rem 1rem;
		}
	}
</style>
