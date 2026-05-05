'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" })
  const router = useRouter()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    if (res.ok) router.push("/login")
    else alert("Registration failed")
  }

  return (
    <form onSubmit={handleRegister}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  )
}
