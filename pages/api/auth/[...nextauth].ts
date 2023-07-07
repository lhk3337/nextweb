import { verifyPassword } from "libs/auth";
import { closeMongoDB, collectionMongoDB } from "libs/mongodb";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await (
          await collectionMongoDB("users")
        ).findOne({
          email: email,
        });

        if (!user) {
          await closeMongoDB();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          await closeMongoDB();
          throw new Error("Could not log you in!");
        }

        await closeMongoDB();
        return { email: user.email };
      },
    }),
  ],
});
