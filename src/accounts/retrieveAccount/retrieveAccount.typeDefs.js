import { gql } from "apollo-server-core";

export default gql`
  type Query {
    retrieveAccount(id: Int!): Account
  }
`;
