import client from "../../client";
import { ERROR_MESSAGE_NOT_FOUND } from "../../constants";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    signUp: async (_, { email, username, firstName, lastName, password }) => {
      try {
        const foundUser = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });
        // check is valid email or username.
        if (foundUser)
          return {
            ok: false,
            error: `The user ${ERROR_MESSAGE_NOT_FOUND}`,
          };

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
        return {
          ok: false,
          error: "Failed create a new account.",
        };
      }
    },
  },
};
