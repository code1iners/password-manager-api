import { gql } from "apollo-server-core";

export default gql`
  type Account {
    id: Int!
    title: String!
    subtitle: String
    thumbnail: Upload
    username: String!
    password: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
