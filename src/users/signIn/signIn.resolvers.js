import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ERROR_INCORRECT_PASSWORD,
  ERROR_USER_NOT_FOUND,
} from "../../constants";

export default {
  Mutation: {
    /**
     * ### User sign in.
     * @param {string} email > Unique email.
     * @param {string} password > Plain password.
     * @returns Access token.
     */
    signIn: async (_, { email, password }) => {
      // Find user by email
      const foundUser = await client.user.findFirst({ where: { email } });
      if (!foundUser) {
        return {
          ok: false,
          error: ERROR_USER_NOT_FOUND,
        };
      }

      // Compare password.
      const passwordIsValid = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!passwordIsValid) {
        return {
          ok: false,
          error: ERROR_INCORRECT_PASSWORD,
        };
      }

      // Sign access token.
      const token = await jwt.sign(
        { id: foundUser.id },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
        id: foundUser.id,
      };
    },
  },
};
