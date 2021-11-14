import client from "../../client";
import { ERROR_CODE_NOT_FOUND } from "../../constants";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    deleteUser: protectedResolver(async (_, __, { me }) => {
      const { id: myId } = await client.user.findUnique({
        where: { id: me.id },
        select: { id: true },
      });

      if (!myId) {
        return {
          ok: false,
          error: ERROR_CODE_NOT_FOUND,
        };
      }

      // Delete my accounts info.
      await client.account.deleteMany({
        where: {
          userId: myId,
        },
      });

      // Delete my account.
      const deletedUser = await client.user.delete({ where: { id: me.id } });

      if (deletedUser.id) {
        return { ok: true };
      } else {
        return {
          ok: false,
          error: ERROR_CODE_NOT_FOUND,
        };
      }
    }),
  },
};
