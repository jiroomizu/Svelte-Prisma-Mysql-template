<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '../app.config';
	import Block from '$lib/Block.svelte';

	// modifier is not exists in DB, just for apperance control.
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
		const response = await fetch(config.apiURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query })
		});

		if (response.ok) {
			const resObj = await response.json();
			const posts = await resObj.data.getAllPosts;
			const items = await posts.map((item: Post) => {
				// if the post has no title, make the section narrow.
				if (!item.title) {
					item['modifier'] = 'narrow';
				}

				// api response includes objects of categories and tags,
				// arrage them to array of the name strings.
				item['categoriesStr'] = item.categories.map((category) => {
					return category.category.name;
				});
				item['tagsStr'] = item.tags.map((tag) => {
					return tag.tag.name;
				});
				return item;
			});
			return items;
		} else {
			throw new Error('API call failed');
		}
	};

	$: postsPromise = getPosts();
</script>

<svelte:head>
	<title>{config.siteName}</title>
	<meta name="description" content={config.shortDesc} />
</svelte:head>

{#await postsPromise then items}
	{#each items as item, index (item.id)}
		<Block data-index={index} data={item} />
	{/each}
{/await}
