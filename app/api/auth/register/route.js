import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(req) {
  const { username, name, email, password } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, name, email, password: hashedPassword }])

  if (error) return Response.json({ error: error.message }, { status: 400 })

  return Response.json({ message: "User created successfully" }, { status: 201 })
}
