import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createAccount: protectedResolver(
      (
        _,
        { title, subtitle, accountName, accountPassword, thumbnail },
        { me }
      ) => {
        return client.account.create({
          data: {
            title,
            subtitle,
            accountName,
            accountPassword,
            user: {
              connect: {
                id: me.id,
              },
            },
          },
        });
      }
    ),
  },
};
