import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

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
          const { filename, createReadStream } = await thumbnail;
          const storeFileName = `${me.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/thumbnails/${storeFileName}`
          );
          readStream.pipe(writeStream);

          thumbnailUrl = `http://121.161.239.148:4000/static/${storeFileName}`;
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

        if (createdAccount) {
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
