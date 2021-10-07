import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateAccount(
      id: Int!
      title: String
      subtitle: String
      username: String
      password: String
      thumbnail: Upload
    ): MutationResponse!
  }
`;
