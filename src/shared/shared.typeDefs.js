import { gql } from "apollo-server-core";

export default gql`
  scalar Upload

  type Query {
    hello: String
  }

  type ResultResponse {
    ok: Boolean!
    error: String
  }
`;
