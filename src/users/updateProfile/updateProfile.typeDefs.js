import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateProfile(
      firstName: String
      lastName: String
      email: String
      username: String
      password: String
      avatar: Upload
    ): UserResponse!
  }
`;
