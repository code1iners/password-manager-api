import { gql } from "apollo-server-core";

export default gql`
  scalar Upload

  type Query {
    hello: String
  }

  type MutationResponse {
    ok: Boolean!
    error: String
  }

  type UserResponse {
    ok: Boolean!
    error: String
    data: User
  }

  type AccountResponse {
    ok: Boolean!
    error: String
    data: Account
  }

  type AccountsResponse {
    ok: Boolean!
    accounts: [Account]
  }
`;
