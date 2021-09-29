import { gql } from "apollo-server-core";

export default gql`
  type SignInResponse {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    signIn(email: String!, password: String!): SignInResponse!
  }
`;
