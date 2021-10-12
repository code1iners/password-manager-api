import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createAccount: protectedResolver(
      async (
        _,
        { title, subtitle, accountName, password, thumbnail },
        { me }
      ) => {
        const res = await client.account.create({
          data: {
            title,
            subtitle,
            accountName,
            password,
            user: {
              connect: {
                id: me.id,
              },
            },
          },
        });

        if (res) {
          return {
            ok: true,
          };
        }

        return {
          ok: false,
          error: "Create account failed.",
        };
      }
    ),
  },
};
