import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(
      title: String!
      subtitle: String
      accountName: String!
      password: String!
      thumbnail: Upload
    ): MutationResponse!
  }
`;
