'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email, password, redirect: false
    })
    if (res.ok) router.push("/")
    else alert("Invalid credentials")
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
