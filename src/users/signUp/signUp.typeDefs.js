import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    signUp(
      email: String!
      username: String!
      firstName: String!
      lastName: String
      password: String!
    ): ResultResponse!
  }
`;
