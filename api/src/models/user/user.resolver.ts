import { randomBytes, scryptSync } from "crypto";
import type { GraphQLContext } from "../../client";

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

export const hashPassword = (password: string): string => {
  // Any random string here (ideally should be atleast 16 bytes)
  const salt = randomBytes(16).toString("hex");
  console.log(salt);
  return encryptPassword(password, salt) + salt;
};

export const matchPassword = (
  password: string,
  hash: string | null
): Boolean => {
  // hash can be null if the user is not existed
  if (!!hash) {
    // extract salt from the hashed string
    // our hex password length is 32*2 = 64
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const currentPassHash = encryptPassword(password, salt);
    return originalPassHash === currentPassHash;
  }
  return false;
};

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
        password: string;
      },
      ctx: GraphQLContext
    ) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashPassword(args.password),
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
          password: hashPassword(args.password),
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
    authUser: async (
      _: {},
      args: {
        email: string;
        password: string;
      },
      ctx: GraphQLContext
    ) => {
      const targetUser = await ctx.prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          lastLogIn: new Date(),
        },
      });
      if (matchPassword(args.password, targetUser.password)) {
        return targetUser;
      }
      return "email or password is not correct.";
    },
  },
};

export default userResolver;
