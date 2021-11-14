import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt";
import { saveImageIntoLocal } from "../../utils/ImageManager";

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
          avatarUrl = await saveImageIntoLocal({ id: me.id, image: avatar });
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
