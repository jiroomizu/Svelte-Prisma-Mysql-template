import type { GraphQLContext } from "../../client";

const categoryResolver = {
  Query: {
    getAllCategories: (_: {}, args: {}, ctx: GraphQLContext) => {
      return ctx.prisma.category.findMany({
        orderBy: {
          sortOrder: "asc",
        },
      });
    },
  },
  Mutation: {
    createCategory: async (
      _: {},
      args: {
        name: string;
      },
      ctx: GraphQLContext
    ) => {
      const newTag = await ctx.prisma.category.create({
        data: {
          name: args.name,
        },
      });
      return newTag;
    },
    createManyCategories: async (
      _: {},
      args: {
        names: string[];
      },
      ctx: GraphQLContext
    ) => {
      const input = [...args.names].map((item) => {
        return { name: item };
      });
      const newCategories = await ctx.prisma.category.createMany({
        data: [...input],
      });
      return newCategories;
    },
    updateCategory: async (
      _: {},
      args: {
        id: number;
        name: string;
      },
      ctx: GraphQLContext
    ) => {
      const updatedCategory = await ctx.prisma.category.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
      return updatedCategory;
    },
    deleteCategory: async (
      _: {},
      args: {
        id: number;
      },
      ctx: GraphQLContext
    ) => {
      const deletedTag = await ctx.prisma.category.delete({
        where: {
          id: args.id,
        },
      });
      return deletedTag;
    },
  },
};

export default categoryResolver;
