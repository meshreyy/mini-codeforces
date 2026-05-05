import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Mini Codeforces!</h1>
        <p className="text-gray-500 mb-8">Compete, solve problems, and improve your skills.</p>
        <div className="flex justify-center gap-4">
          <Link href="/contests" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            View Contests
          </Link>
          <Link href="/problems" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">
            Solve Problems
          </Link>
        </div>
      </div>
    </section>
  )
}
