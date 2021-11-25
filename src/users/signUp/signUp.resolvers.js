import client from "../../client";
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_USERNAME_ALREADY_EXISTS,
} from "../../constants";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    signUp: async (_, { email, username, firstName, lastName, password }) => {
      try {
        const isEmailExists = await client.user.findFirst({
          where: { email },
          select: { id: true },
        });
        // check is valid email or username.
        if (isEmailExists)
          return {
            ok: false,
            error: ERROR_EMAIL_ALREADY_EXISTS,
          };

        const isUsernameExists = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (isUsernameExists) {
          return {
            ok: false,
            error: ERROR_USERNAME_ALREADY_EXISTS,
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          error: "Failed create a new account.",
        };
      }
    },
  },
};
