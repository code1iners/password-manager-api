import jwt from "jsonwebtoken";
import client from "../client";

/**
 * ### Get user information by access token.
 * @param {string} token > Access token.
 */
export const getUserByToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await client.user.findUnique({ where: { id } });
    if (foundUser) {
      return foundUser;
    } else {
      throw new Error("Authorization invalid.");
    }
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

/**
 * ### Resolver which has authentication (me information).
 */
export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.me) {
    const isQuery = info.operation.operation === "query";
    if (isQuery) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please sign in to perform this action.",
      };
    }
  }

  return resolver(root, args, context, info);
};
