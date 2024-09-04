import { credentialsProvider } from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    credentialsProvider
  ],
};

export default authOptions;
