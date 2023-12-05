import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            console.log(account, profile)
            return true;
        }
    },
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST,
}