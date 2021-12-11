import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { saveImageIntoS3 } from "../../utils/ImageManager";

export default {
  Mutation: {
    updateAccount: protectedResolver(
      async (
        _,
        { id, title, subtitle, accountName, accountPassword, thumbnail },
        { me }
      ) => {
        const foundAccountId = await client.account.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!foundAccountId) {
          return {
            ok: false,
            error: "Account does not found.",
          };
        }

        let thumbnailUrl;
        if (thumbnail) {
          thumbnailUrl = await saveImageIntoS3({
            id: me.id,
            image: thumbnail,
            directory: "accounts",
          });
        }

        const updatedAccount = client.account.update({
          where: { id },
          data: {
            title,
            subtitle,
            accountName,
            accountPassword,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
          },
        });

        return {
          ok: true,
          data: updatedAccount,
        };
      }
    ),
  },
};
