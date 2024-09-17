import { credentialsProvider } from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [credentialsProvider],
  events:{
    signIn(message) {
        
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

export default authOptions;
