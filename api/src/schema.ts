import { makeExecutableSchema } from "@graphql-tools/schema";
import userDef from "./models/user/user.types";
import userResolver from "./models/user/user.resolver";
import postDef from "./models/post/post.types";
import postResolver from "./models/post/post.resolver";
import tagDef from "./models/tag/tag.types";
import tagResolver from "./models/tag/tag.resolver";
import categoryDef from "./models/category/category.types";
import categoryResolver from "./models/category/category.resolver";

// combine type definitions.
export const typeDefs = /* GraphQL */ `
  scalar GraphQLDateTime
  scalar GraphQLDate
  scalar GraphQLTime

  ${userDef}
  ${postDef}
  ${tagDef}
  ${categoryDef}
`;

// make schema with resolvers and type definitions.
export const schema = makeExecutableSchema({
  resolvers: [userResolver, postResolver, tagResolver, categoryResolver],
  typeDefs: [typeDefs],
});
