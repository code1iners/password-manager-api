import { gql } from "apollo-server-core";

export default gql`
  type Account {
    id: Int!
    title: String!
    subtitle: String
    thumbnail: Upload
    accountName: String!
    accountPassword: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
