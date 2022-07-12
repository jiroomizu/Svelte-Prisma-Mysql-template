import { PrismaClient } from "@prisma/client";

// make a new client and reuse it whenenver it's possible

let prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
  };
}
