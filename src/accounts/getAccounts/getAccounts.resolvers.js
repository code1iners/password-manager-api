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

    getAccountsWithPage: protectedResolver((_, { lastId }, { me }) => {
      return client.user.findUnique({ where: { id: me.id } }).accounts({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    }),
  },
};
