export default /* GraphQL */ `
  type Query {
    getAllUsers: [User!]!
    getUser(id: Int!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!

    updateUser(
      id: Int!
      name: String
      email: String
      avatar: String
      password: String
    ): User

    deleteUser(id: Int!): User

    authUser(email: String, password: String): User
  }

  type User {
    id: ID
    name: String!
    email: String
    avatar: String
    password: String
    lastLogIn: GraphQLDateTime
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }
`;
