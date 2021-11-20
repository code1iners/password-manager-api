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
        let thumbnailUrl;
        if (thumbnail) {
          thumbnailUrl = await saveImageIntoS3({
            id: me.id,
            image: thumbnail,
            directory: "accounts",
          });
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
