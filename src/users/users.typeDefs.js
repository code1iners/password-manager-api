import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    firstName: String!
    lastName: String
    password: String!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`;
