import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt";
import { saveImageIntoS3 } from "../../utils/ImageManager";

export default {
  Mutation: {
    updateProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword, avatar },
        { me }
      ) => {
        let avatarUrl;
        if (avatar) {
          avatarUrl = await saveImageIntoS3({
            id: me.id,
            image: avatar,
            directory: "profiles",
          });
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
            username,
            email,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
            data: updatedUser,
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
