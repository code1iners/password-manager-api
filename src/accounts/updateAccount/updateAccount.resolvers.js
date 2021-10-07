import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateAccount: protectedResolver(
      async (
        _,
        { id, title, subtitle, username, password, thumbnail },
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
          const { filename, createReadStream } = await thumbnail;
          const storeFilename = `${me.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/thumbnails/${storeFilename}`
          );
          readStream.pipe(writeStream);
          thumbnailUrl = `http://localhost:4000/static/${storeFilename}`;
        }

        await client.account.update({
          where: { id },
          data: {
            title,
            subtitle,
            username,
            password,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
