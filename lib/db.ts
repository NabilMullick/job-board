import type { Job } from "./types"

// This is a placeholder for a real database connection
// In a real application, you would use a proper database like PostgreSQL, MongoDB, etc.

// In-memory storage for jobs
let jobsStore: Job[] = []

export const db = {
  // Get all jobs with optional filtering
  async getJobs({
    page = 1,
    limit = 10,
    query = "",
    location = "",
    experience = "",
    source = "",
  }: {
    page?: number
    limit?: number
    query?: string
    location?: string
    experience?: string
    source?: string
  } = {}) {
    let filteredJobs = [...jobsStore]

    if (query) {
      const searchRegex = new RegExp(query, "i")
      filteredJobs = filteredJobs.filter((job) => searchRegex.test(job.title) || searchRegex.test(job.company))
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (experience) {
      filteredJobs = filteredJobs.filter((job) => job.experience.toLowerCase().includes(experience.toLowerCase()))
    }

    if (source) {
      filteredJobs = filteredJobs.filter((job) => job.source === source)
    }

    const total = filteredJobs.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedJobs = filteredJobs.slice(start, end)

    return {
      jobs: paginatedJobs,
      total,
    }
  },

  // Get a job by ID
  async getJobById(id: string) {
    return jobsStore.find((job) => job.id === id) || null
  },

  // Get unique filter options
  async getFilterOptions() {
    const locations = Array.from(new Set(jobsStore.map((job) => job.location)))
    const experienceLevels = Array.from(new Set(jobsStore.map((job) => job.experience)))
    const sources = Array.from(new Set(jobsStore.map((job) => job.source).filter(Boolean)))

    return {
      locations,
      experienceLevels,
      sources,
    }
  },

  // Save jobs to the database
  async saveJobs(jobs: Job[]) {
    // In a real database, you would upsert the jobs
    // For this in-memory implementation, we'll just add them

    // Create a map of existing jobs by ID for quick lookup
    const existingJobsMap = new Map(jobsStore.map((job) => [job.id, job]))

    // Update existing jobs or add new ones
    jobs.forEach((job) => {
      existingJobsMap.set(job.id, job)
    })

    // Update the jobs store
    jobsStore = Array.from(existingJobsMap.values())

    return jobsStore.length
  },

  // Clear all jobs (for testing)
  async clearJobs() {
    jobsStore = []
    return true
  },
}

// Function to save jobs to the database
export async function saveJobsToDatabase(jobs: Job[]) {
  return await db.saveJobs(jobs)
}

// Initialize the database with mock data if empty
export async function initializeDatabase() {
  // Check if the database is empty
  const { total } = await db.getJobs()

  if (total === 0) {
    // If empty, add mock data
    await db.saveJobs(mockJobs)
    console.log("Database initialized with mock data")
  }
}

// Mock data for development
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    experience: "3-5 years",
    applicationLink: "https://example.com/apply/1",
    description:
      "<p>We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.</p><p>The ideal candidate has strong experience with React, TypeScript, and modern frontend development practices.</p>",
    postedDate: "2 days ago",
    tags: ["React", "TypeScript", "Frontend"],
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management libraries",
      "Knowledge of responsive design principles",
      "Bachelor's degree in Computer Science or related field",
    ],
    companyDescription: "TechCorp is a leading technology company specializing in web and mobile applications.",
    source: "Mock Data",
  },
]

