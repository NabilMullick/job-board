"use client"

import type { Job } from "@/lib/types"
import JobCard from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface JobListProps {
  jobs: Job[]
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export default function JobList({ jobs, isLoading, hasMore, onLoadMore }: JobListProps) {
  if (isLoading && jobs.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow-sm border">
            <Skeleton className="h-6 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {isLoading && (
        <div className="mt-4 space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-sm border">
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="mt-6 text-center">
          <Button onClick={onLoadMore} variant="outline">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  )
}

