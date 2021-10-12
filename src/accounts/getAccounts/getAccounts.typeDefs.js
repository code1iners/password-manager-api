import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getAccounts(page: Int!): [Account]
  }
`;
