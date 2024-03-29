import { config } from '../app.config';
import type { Post } from 'types/global';

/** @type {import('./$types').PageLoad} */
export function load({ fetch }) {
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
		// try {
		const response = await fetch(config.apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});
		const resObj = await response.json();
		const posts = await resObj.data.getAllPosts;
		const items = await posts.map((item: Post) => {
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
		// } catch (error) {
		// 	console.error(error);
		// 	throw new Error('something went wrong in the fetching');
		// }
	};
	const posts = getPosts();
	return {
		posts: posts
	};
}
