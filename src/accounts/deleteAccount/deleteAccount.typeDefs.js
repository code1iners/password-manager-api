import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAccount(id: Int!): MutationResponse!
  }
`;
