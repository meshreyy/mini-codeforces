import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email }
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
