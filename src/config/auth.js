import Google from "next-auth/providers/google"

export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  pages: {
    signIn: '/login'
  }
}