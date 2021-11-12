import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, password: newPassword, avatar },
        { me }
      ) => {
        let avatarUrl;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const storeFileName = `${me.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${storeFileName}`
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://121.161.239.148:4000/static/${storeFileName}`;
        }

        // check password.
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        // real update.
        const updatedUser = await client.user.update({
          where: { id: me.id },
          data: {
            firstName,
            lastName,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Update failed.",
          };
        }
      }
    ),
  },
};
