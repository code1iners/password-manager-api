import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    /**
     * ### Get my accounts.
     * @returns account list.
     */
    getAccounts: protectedResolver(async (_, { page }, { me }) => {
      return client.account.findMany({
        where: { userId: me.id },
        take: 10,
        skip: (page - 1) * 10,
      });
    }),
  },
};
