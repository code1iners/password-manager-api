import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { me }) => {
      return client.user.findUnique({ where: { id: me.id } });
    }),
  },
};
