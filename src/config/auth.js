import Google from "next-auth/providers/google"
import { verifyUserRole } from "../utils/api-call"
import { getServerSession } from "next-auth"

export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.provider === 'google') {
        try {
          const data = await verifyUserRole(user.email)
          return data
        } catch (e) {
          return false
        }
      }
      return true
    },

    async redirect({ url, baseUrl }) {
      if (await getServerSession() && (url == baseUrl + '/login' || url == baseUrl + '/register')) {
        return baseUrl
      }

      return url
    }
  }
}