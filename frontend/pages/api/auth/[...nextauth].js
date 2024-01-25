import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOption = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],

    callbacks: {
        async session({ session, token }) {
            if (session?.user?.name) {
                session.user.username = session.user.name
                    .split(" ")
                    .join("")
                    .toLowerCase();
            }

            if (token.sub) {
                session.user.uid = token.sub;
            }
            return session;
        },
    },

    secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOption);