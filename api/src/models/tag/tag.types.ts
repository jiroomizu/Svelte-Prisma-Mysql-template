export default /* GraphQL */ `
  type Query {
    getAllTags: [Tag!]!
  }

  type Mutation {
    createTag(name: String!): Tag!
    createManyTags(names: [String]!): [Tag]!
    updateTag(id: Int!, name: String!): Tag!
    deleteTag(id: Int!): Tag!
  }

  type Tag {
    id: Int!
    name: String!
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    posts: [Post]
  }
`;
