export { default } from "next-auth/middleware"
// export { auth as middleware } from "@/config/auth"

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/dashboard"],
}