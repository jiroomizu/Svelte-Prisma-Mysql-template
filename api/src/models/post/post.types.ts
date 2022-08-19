export default /* GraphQL */ `
  type Query {
    getAllPosts: [Post!]!
    getPostsByUser(authorId: Int!): [Post!]!
  }

  type Mutation {
    createPost(
      title: String
      link: String
      content: String
      authorId: Int!
      tags: [Int] # create & update are invoked with ids
      categories: [Int] # create & update are invoked with ids
    ): Post!

    updatePost(
      id: Int!
      link: String
      title: String
      content: String
      authorId: Int!
      tags: [Int] # create & update are invoked with ids
      categories: [Int] # create & update are invoked with ids
    ): Post!

    deletePost(id: Int!): Post!
  }

  type Post {
    id: Int!
    title: String
    link: String
    content: String
    authorId: Int!
    tags: [TagsOnPosts]
    categories: [CategoriesOnPosts]
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type TagsOnPosts {
    id: Int!
    postId: Int!
    tag: Tag
    tagId: Int!
    sortOrder: Int
    createdAt: GraphQLDateTime
    assignedBy: Int!
  }

  type CategoriesOnPosts {
    id: Int!
    postId: Int!
    category: Category
    categoryId: Int!
    sortOrder: Int
    createdAt: GraphQLDateTime
    assignedBy: Int!
  }
`;
