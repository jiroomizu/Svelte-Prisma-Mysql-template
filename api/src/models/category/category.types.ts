export default /* GraphQL */ `
  type Query {
    getAllCategories: [Category!]!
  }

  type Mutation {
    createCategory(name: String!, sortOrder: Int!): Category!
    createManyCategories(names: [String]!): [Category]!
    updateCategory(id: Int!, name: String, sortOrder: Int): Category!
    deleteCategory(id: Int!): Category!
  }

  type Category {
    id: ID!
    name: String!
    sortOrder: Int!
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    posts: [Post]
  }
`;
