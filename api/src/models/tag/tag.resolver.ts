import type { GraphQLContext } from "../../client";

const tagResolver = {
  Query: {
    getAllTags: (_: {}, args: {}, ctx: GraphQLContext) => {
      return ctx.prisma.tag.findMany({
        orderBy: {
          sortOrder: "asc",
        },
      });
    },
  },
  Mutation: {
    createTag: async (
      _: {},
      args: {
        name: string;
      },
      ctx: GraphQLContext
    ) => {
      const newTag = await ctx.prisma.tag.create({
        data: {
          name: args.name,
        },
      });
      return newTag;
    },
    createManyTags: async (
      _: {},
      args: {
        names: string[];
      },
      ctx: GraphQLContext
    ) => {
      const input = [...args.names].map((item) => {
        return { name: item };
      });
      const newTags = await ctx.prisma.tag.createMany({
        data: [...input],
      });
      return newTags;
    },
    updateTag: async (
      _: {},
      args: {
        id: number;
        name: string;
      },
      ctx: GraphQLContext
    ) => {
      const updatedTag = await ctx.prisma.tag.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
      return updatedTag;
    },
    deleteTag: async (
      _: {},
      args: {
        id: number;
      },
      ctx: GraphQLContext
    ) => {
      const deletedTag = await ctx.prisma.tag.delete({
        where: {
          id: args.id,
        },
      });
      return deletedTag;
    },
  },
};

export default tagResolver;
