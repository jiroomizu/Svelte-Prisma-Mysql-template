<script lang="ts">
  import { config } from '../app.config';
	import Block from '$lib/Block.svelte';
  import type { Post } from 'types/global';

  /** @type {import('./$types').PageData} */
  export let data: {posts: Post[]};
</script>

<svelte:head>
	<title>{config.siteName}</title>
	<meta name="description" content={config.shortDesc} />
</svelte:head>

{#each data.posts as post}
  <Block data={post} />
{/each}
