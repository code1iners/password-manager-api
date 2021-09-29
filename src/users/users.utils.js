import jwt from "jsonwebtoken";

/**
 * ### Get user information by access token.
 * @param {string} token > Access token.
 */
export const getUserByToken = (token) => {
  try {
    if (!token) return null;

    const res = jwt.verify(token, process.env.SECRET_KEY);
    console.log(res);
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
