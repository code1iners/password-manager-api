import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    /**
     * ### Delete Account By Id.
     * @param {number} id > Account ID.
     */
    deleteAccount: protectedResolver(async (_, { id }, { me }) => {
      const { userId } = await client.account.findUnique({
        where: { id },
        select: { userId: true },
      });

      // 계정이 존재하지 않는 경우.
      if (!userId) {
        return {
          ok: false,
          error: "The account does not found.",
        };
      }

      // 현재 로그인된 유저의 계정이 아닌 경우.
      if (userId !== me.id) {
        return {
          ok: false,
          error: "Request was rejected because you don't have permission.",
        };
      }

      // 계정 삭제.
      await client.account.delete({ where: { id } });

      return {
        ok: true,
      };
    }),
  },
};
