export default /* GraphQL */ `
  type Query {
    getAllTags: [Tag!]!
  }

  type Mutation {
    createTag(name: String!, sortOrder: Int!): Tag!
    createManyTags(names: [String]!): [Tag]!
    updateTag(id: Int!, name: String, sortOrder: Int): Tag!
    deleteTag(id: Int!): Tag!
  }

  type Tag {
    id: Int!
    name: String!
    sortOrder: Int!
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    posts: [Post]
  }
`;
