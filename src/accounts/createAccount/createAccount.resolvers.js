import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { saveImageIntoLocal } from "../../utils/ImageManager";

export default {
  Mutation: {
    createAccount: protectedResolver(
      async (
        _,
        { title, subtitle, accountName, accountPassword, thumbnail },
        { me }
      ) => {
        let thumbnailUrl;
        if (thumbnail) {
          thumbnailUrl = await saveImageIntoLocal({
            id: me.id,
            image: thumbnail,
          });
          console.log(thumbnailUrl);
        }

        return await client.account.create({
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
      }
    ),
  },
};
