import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { saveImageIntoLocal } from "../../utils/ImageManager";

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
          thumbnailUrl = await saveImageIntoLocal({
            id: me.id,
            image: thumbnail,
          });
        }

        return client.account.update({
          where: { id },
          data: {
            title,
            subtitle,
            accountName,
            accountPassword,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
          },
        });
      }
    ),
  },
};
