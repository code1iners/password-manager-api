import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { saveImageIntoS3 } from "../../utils/ImageManager";

export default {
  Mutation: {
    createAccount: protectedResolver(
      async (
        _,
        { title, subtitle, accountName, accountPassword, thumbnail },
        { me }
      ) => {
        try {
          let thumbnailUrl;
          if (thumbnail) {
            thumbnailUrl = await saveImageIntoS3({
              id: me.id,
              image: thumbnail,
              directory: "accounts",
            });
          }

          const createdAccount = await client.account.create({
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
              ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
            },
          });

          return {
            ok: true,
            data: createdAccount,
          };
        } catch (error) {
          console.error("[createAccount]", error);

          return {
            ok: false,
            error: "Failed create account.",
          };
        }
      }
    ),
  },
};
