import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    /**
     * ### Get accounts.
     * @returns account list.
     */
    getAccounts: protectedResolver(async (_, { page }, { me }) => {
      return client.account.findMany({
        where: { userId: me.id },
        take: 10,
        skip: (page - 1) * 10,
      });
    }),

    /**
     * ### Accounts list.
     * @returns {Array} [Account]
     */
    accounts: protectedResolver((_, { offset = 0, take = 10 }, { me }) => {
      return client.account.findMany({
        take,
        skip: offset,
        where: { userId: me.id },
      });
    }),
  },
};
