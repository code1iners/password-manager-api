import { gql } from "apollo-server-core";

export default gql`
  type SignInResponse {
    ok: Boolean!
    token: String
    id: Int
    error: String
  }
  type Mutation {
    signIn(email: String!, password: String!): SignInResponse!
  }
`;
