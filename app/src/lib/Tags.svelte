<script lang="ts">
	export let categories: string[] = [];
	export let tags: string[] = [];
</script>

<div class="row">
	{#if categories.length > 0}
		<dl class="tags">
			<dt class="tags__title">Contribution:</dt>
			{#each categories as category, index (category)}
				<dd data-index={index} class="tags__definition">{category}</dd>
			{/each}
		</dl>
	{/if}
	{#if tags.length > 0}
		<dl class="tags">
			<dt class="tags__title">Tools:</dt>
			{#each tags as tag, index (tag)}
				<dd data-index={index} class="tags__definition">{tag}</dd>
			{/each}
		</dl>
	{/if}
</div>

<style lang="scss">
	.row {
		align-content: flex-start;
		color: #ddd;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0 0 2rem;
	}

	.tags {
		align-content: flex-start;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
    font-weight: 400;
		margin: 0 3rem 0 0;
		padding: 0;
	}

	.tags__title {
		margin: 0 0.5rem 0 0;
	}

	.tags__definition {
		margin: 0 0.5rem 0 0;
	}

	.tags__definition + .tags__definition::before {
		color: #aaa;
		content: '/';
		margin: 0 0.5rem 0 0;
	}
</style>
