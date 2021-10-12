import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    /**
     * ### Get Account By Id.
     * @param {number} id > Account id.
     * @returns Account object.
     */
    retrieveAccount: protectedResolver(async (_, { id }) => {
      return client.account.findUnique({ where: { id } });
    }),
  },
};
