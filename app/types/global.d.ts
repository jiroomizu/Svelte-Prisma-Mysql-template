/// <reference types="@sveltejs/kit" />
declare module '*.svelte' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}

export type Post = {
	id: number;
	title: string;
	link: string;
	content: string;
	categories: [
		{
			category: {
				name: string;
				sortOrder: number;
			};
		}
	];
	categoriesStr: string[];
	tags: [
		{
			tag: {
				name: string;
				sortOrder: number;
			};
		}
	];
	tagsStr: string[];
	modifier: string;
};
