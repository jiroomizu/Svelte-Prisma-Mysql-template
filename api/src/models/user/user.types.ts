export default /* GraphQL */ `
  type Query {
    getAllUsers: [User!]!
    getUser(id: Int!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!

    updateUser(
      id: Int!
      name: String
      email: String
      avatar: String
      credential: String
    ): User

    deleteUser(id: Int!): User
  }

  type User {
    id: ID
    name: String!
    email: String
    avatar: String
    password: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }
`;
