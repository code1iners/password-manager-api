import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      password: String
      avatar: Upload
    ): ResultResponse!
  }
`;
