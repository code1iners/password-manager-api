import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,

  Query: {
    hello: () => "world",
  },
};
