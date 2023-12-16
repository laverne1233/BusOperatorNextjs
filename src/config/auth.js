import Google from "next-auth/providers/google"
import { auth } from "@/config/firebase"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { verifyUserRole } from "../utils/api-call"
import { getServerSession } from "next-auth"

export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '')
          .then(async (userCredential) => {
            const roleResult = await verifyUserRole(credentials.email)
            if (userCredential.user && roleResult.success) {
              return userCredential.user;
            }

            return null;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
      }
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        const data = await verifyUserRole(user.email)
        console.log(data)
        if (!data.success) {
          return false
        }

        return user
      } catch (e) {
        return false
      }
    },

    async redirect({ url, baseUrl }) {
      if (await getServerSession() && (url == baseUrl + '/login' || url == baseUrl + '/register')) {
        return baseUrl
      }

      return url
    }
  }
}