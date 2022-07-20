<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '../app.config';
	import Block from '$lib/Block.svelte';

	// "modifier" does not exist in DB, just for apperance control.
	// add it after fetching.
	type Post = {
		id: number;
		modifier: string;
		title: string;
		link: string;
		content: string;
		categories: [
			{
				category: {
					name: string;
				};
			}
		];
		categoriesStr: string[];
		tags: [
			{
				tag: {
					name: string;
				};
			}
		];
		tagsStr: string[];
	};

	const query = /* graphQL */ `{
    getAllPosts {
      id
      title
      link
      content
      tags {
        tag {
          name
        }
      }
      categories {
        category {
          name
        }
      }
    }
  }`;

	const getPosts = async () => {
		try {
			const response = await fetch(config.apiURL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query })
			});
			const resObj = await response.json();
			const posts = await resObj.data.getAllPosts;
			const items = await posts.map((item: Post) => {
				// if the post has no title, add modifier to make the section narrow.
				if (!item.title) {
					item['modifier'] = 'narrow';
				}

				// api response includes objects of categories and tags,
				// edit them into array of the name strings.
				item['categoriesStr'] = item.categories.map((category) => {
					return category.category.name;
				});
				item['tagsStr'] = item.tags.map((tag) => {
					return tag.tag.name;
				});
				return item;
			});
			return items;
		} catch (error) {
			console.error(error);
			throw new Error('something went wrong in the fetching');
		}
	};

	$: postsPromise = getPosts();
</script>

<svelte:head>
	<title>{config.siteName}</title>
	<meta name="description" content={config.shortDesc} />
</svelte:head>

{#await postsPromise then items}
	{#each items as item}
		<Block data={item} />
	{/each}
{/await}
