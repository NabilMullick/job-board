import type { Job } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
          </div>
          <Link href={`/jobs/${job.id}`}>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {job.experience}
          </Badge>
          {job.source && (
            <Badge variant="secondary" className="capitalize">
              {job.source}
            </Badge>
          )}
          {job.tags &&
            job.tags.slice(0, 1).map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
        </div>
        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="flex items-center">
            Apply
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

