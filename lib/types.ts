export interface Job {
    id: string
    title: string
    company: string
    location: string
    experience: string
    applicationLink: string
    description: string
    postedDate: string
    tags?: string[]
    requirements?: string[]
    companyDescription?: string
    source?: string // Added source field to track where the job was crawled from
  }
  
  export interface JobsQueryParams {
    page: number
    limit: number
    query?: string
    location?: string
    experience?: string
    source?: string // Added source parameter for filtering by source
  }
  
  