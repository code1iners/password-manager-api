import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(
      title: String!
      subtitle: String
      accountName: String!
      accountPassword: String!
      thumbnail: String
    ): MutationResponse!
  }
`;
