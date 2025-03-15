import JobBoard from "@/components/job-board"
import { initializeDatabase } from "@/lib/db"

// Initialize the database with mock data
initializeDatabase()

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JobBoard />
    </main>
  )
}

