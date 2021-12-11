import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateAccount(
      id: Int!
      title: String
      subtitle: String
      accountName: String
      accountPassword: String
      thumbnail: Upload
    ): AccountResponse!
  }
`;
