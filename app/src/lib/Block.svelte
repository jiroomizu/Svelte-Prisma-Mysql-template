<script lang="ts">
	import Paragraph from './Paragraph.svelte';
	import Tags from './Tags.svelte';

	interface BlockData {
		id: number;
		modifier: string;
		title: string;
		link: string;
		content: string;
		categoriesStr: string[];
		tagsStr: string[];
	}

	export let data: BlockData = {
		id: 0,
		modifier: '',
		title: '',
		link: '',
		content: '',
		categoriesStr: [],
		tagsStr: []
	};

	const sectionClass = !!data.modifier ? `block block--${data.modifier}` : 'block';
</script>

<section class={sectionClass}>
	<!-- heading can be ommited. -->
	{#if !!data.title}
		<h2 class="block__heading">
			<!-- link can be ommited. -->
			{#if !!data.link}
				<a class="block__anchor" href={data.link} title={`To ${data.title}`}>{data.title}</a>
			{:else}
				{data.title}
			{/if}
		</h2>
	{/if}

	<Paragraph content={data.content} />

	<!-- only appears when args include tags and categories. -->
	{#if data.categoriesStr.length > 0 || data.tagsStr.length > 0}
		<Tags categories={data.categoriesStr} tags={data.tagsStr} />
	{/if}
</section>

<style lang="scss">
	.block {
		.block__heading {
			color: #eee;
			font-weight: 400;
			margin: 2rem auto 0.5rem;
		}

		.block__heading::before {
			content: '>';
			color: #fff;
			font-size: 1rem;
			font-weight: 100;
			margin: 0 0.4rem 0 0;
			position: relative;
			top: -0.1rem;
		}

		.block__anchor {
			color: #eee;
			font-weight: 400;
		}

		.block__anchor:hover {
			color: #00c;
			text-decoration: underline;
		}
	}
	.block--narrow {
		margin: 0 1rem 1rem;
	}

	@media (min-width: 480px) {
		.block {
			max-width: 72rem;
			width: 80vw;
		}
		.block--narrow {
			max-width: 62rem;
			width: 70vw;
		}
	}
</style>
