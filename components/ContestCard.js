'use client'
import Link from "next/link"

export function ContestCard({title, id, startTime, endTime}) {

    const now = new Date()
    const isActive = new Date(startTime) <= now && now<= new Date(endTime)
    const isUpcoming = new Date(startTime) > now
    const isPast = now > new Date(endTime)


    const status = isActive ? "Active" : isUpcoming ? "Upcoming" : "Past"

    const durationMs = new Date(endTime) - new Date(startTime)
    const durationHours = Math.floor(durationMs / (1000*60*60))
    const durationMinutes = Math.floor((durationMs % (1000*60*60)) / (1000*60))


    return (
    <div className="border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className={`px-2 py-1 rounded text-sm ${isActive ? "bg-green-100 text-green-700" : isUpcoming ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-2">Starts: {new Date(startTime).toUTCString()
}</p>
      <p className="text-gray-500 text-sm mb-4">Duration: {durationHours}h {durationMinutes}min</p>
      <Link href={`/contests/${id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Participate
      </Link>
    </div>
  )

}
