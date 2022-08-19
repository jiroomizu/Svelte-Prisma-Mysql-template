import type { GraphQLContext } from "../../client";
import {
  makeTagOnPostRelation,
  makeCategoryOnPostRelation,
} from "../../lib/helper";

const postResolver = {
  Query: {
    getAllPosts: (_: {}, args: {}, ctx: GraphQLContext) => {
      return ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
            orderBy: {
              tag: {
                sortOrder: "asc",
              },
            },
          },
          categories: {
            include: {
              category: true,
            },
            orderBy: {
              category: {
                sortOrder: "asc",
              },
            },
          },
        },
      });
    },
    getPostsByUser: (
      _: {},
      args: { authorId: number },
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.post.findMany({
        where: {
          authorId: args.authorId,
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
    },
  },
  Mutation: {
    createPost: async (
      _: {},
      args: {
        title: string;
        link: string;
        content: string;
        authorId: number;
        tags: number[];
        categories: number[];
      },
      ctx: GraphQLContext
    ) => {
      const tags = makeTagOnPostRelation(args.tags, args.authorId);
      const categories = makeCategoryOnPostRelation(
        args.categories,
        args.authorId
      );
      const newPost = await ctx.prisma.post.create({
        data: {
          title: args.title,
          link: args.link,
          content: args.content,
          authorId: args.authorId,
          tags: {
            create: tags,
          },
          categories: {
            create: categories,
          },
        },
      });
      return newPost;
    },
    updatePost: async (
      _: {},
      args: {
        id: number;
        title: string;
        link: string;
        content: string;
        authorId: number;
        tags: number[];
        categories: number[];
      },
      ctx: GraphQLContext
    ) => {
      const tags = makeTagOnPostRelation(args.tags, args.authorId);
      const categories = makeCategoryOnPostRelation(
        args.categories,
        args.authorId
      );

      // if there are tags or categories, delete the relations.
      if (args.tags.length > 0) {
        await ctx.prisma.tagsOnPosts.deleteMany({
          where: {
            postId: args.id,
          },
        });
      }
      if (args.categories.length > 0) {
        await ctx.prisma.categoriesOnPosts.deleteMany({
          where: {
            postId: args.id,
          },
        });
      }
      // update Post and create new relations
      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: args.id,
        },
        data: {
          link: args.link,
          title: args.title,
          content: args.content,
          authorId: args.authorId,
          updatedAt: new Date(),
          tags: {
            create: tags,
          },
          categories: {
            create: categories,
          },
        },
      });
      return updatedPost;
    },
    deletePost: async (
      _: {},
      args: {
        id: number;
      },
      ctx: GraphQLContext
    ) => {
      const deletedPost = await ctx.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
      return deletedPost;
    },
  },
};

export default postResolver;
