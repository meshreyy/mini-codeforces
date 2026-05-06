'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-900 px-4 py-4 md:px-8 flex flex-wrap items-center justify-between gap-4 shadow-lg">
      <Link href="/" className="text-xl md:text-2xl font-bold text-white tracking-wide">
        Mini Codeforces
      </Link>

      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <Link href="/problems" className="text-white hover:text-blue-300 font-medium transition">Problems</Link>
        <Link href="/contests" className="text-white hover:text-blue-300 font-medium transition">Contests</Link>
        <Link href="/standings" className="text-white hover:text-blue-300 font-medium transition">Standings</Link>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-4 items-center">
        {session ? (
          <>
            <span className="text-blue-200">Hi, {session.user.name}</span>
            <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white border border-white px-4 py-2 rounded hover:bg-blue-800 transition">Login</Link>
            <Link href="/register" className="bg-white text-blue-900 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
