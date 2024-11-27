import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  // Configure Google as the authentication provider
  providers: [
    GoogleProvider({
      // Set Google OAuth client ID obtained from environment variables
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      // Set Google OAuth client secret obtained from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  // Customize authentication pages, such as the sign-in page
  pages: {
    signIn: "/login",
  },
};

// Define handler function to process authentication requests
const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

// Export handler function for both GET and POST requests
export { handler as GET, handler as POST };