export default /* GraphQL */ `
  type Query {
    getAllCategories: [Category!]!
  }

  type Mutation {
    createCategory(name: String!): Category!
    createManyCategories(names: [String]!): [Category]!
    updateCategory(id: Int!, name: String!): Category!
    deleteCategory(id: Int!): Category!
  }

  type Category {
    id: ID!
    name: String!
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    posts: [Post]
  }
`;
