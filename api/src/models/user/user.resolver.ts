import type { GraphQLContext } from "../../client";

const userResolver = {
  Query: {
    getAllUsers: (_: {}, args: {}, ctx: GraphQLContext) => {
      return ctx.prisma.user.findMany();
    },
    getUser: (_: {}, args: { id: number }, ctx: GraphQLContext) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          posts: true,
        },
      });
    },
  },
  Mutation: {
    createUser: async (
      _: {},
      args: {
        name: string;
        email: string;
      },
      ctx: GraphQLContext
    ) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
      return newUser;
    },
    updateUser: async (
      _: {},
      args: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        password: string;
      },
      ctx: GraphQLContext
    ) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          email: args.email,
          avatar: args.avatar,
          password: args.password,
        },
      });
      return updatedUser;
    },
    deleteUser: async (
      _: {},
      args: {
        email: string;
      },
      ctx: GraphQLContext
    ) => {
      const deleted = await ctx.prisma.user.delete({
        where: {
          email: args.email,
        },
      });
      return deleted;
    },
  },
};

export default userResolver;
