"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import JobList from "@/components/job-list"
import FilterPanel from "@/components/filter-panel"
import { Search } from "lucide-react"
import type { Job } from "@/lib/types"

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
  })

  const fetchJobs = async (page = 1, query = "") => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/jobs?page=${page}&query=${query}&location=${filters.location}&experience=${filters.experience}`,
      )
      const data = await response.json()

      if (page === 1) {
        setJobs(data.jobs)
        setFilteredJobs(data.jobs)
      } else {
        setJobs((prevJobs) => [...prevJobs, ...data.jobs])
        setFilteredJobs((prevJobs) => [...prevJobs, ...data.jobs])
      }

      setHasMore(data.hasMore)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(1, searchQuery)
  }, [filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchJobs(1, searchQuery)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchJobs(nextPage, searchQuery)
  }

  const handleFilterChange = (newFilters: { location: string; experience: string }) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Board</h1>
        <p className="text-gray-600">Find your dream job</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>

        <div className="md:col-span-3">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Search job titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          <JobList jobs={filteredJobs} isLoading={isLoading} hasMore={hasMore} onLoadMore={handleLoadMore} />
        </div>
      </div>
    </div>
  )
}

