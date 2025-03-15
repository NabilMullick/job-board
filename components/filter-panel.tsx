"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilterPanelProps {
  onFilterChange: (filters: { location: string; experience: string; source?: string }) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [locations, setLocations] = useState<string[]>([])
  const [experienceLevels, setExperienceLevels] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedSource, setSelectedSource] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Fetch available filter options
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("/api/filter-options")
        const data = await response.json()
        setLocations(data.locations || [])
        setExperienceLevels(data.experienceLevels || [])
        setSources(data.sources || [])
      } catch (error) {
        console.error("Error fetching filter options:", error)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleApplyFilters = () => {
    onFilterChange({
      location: selectedLocation,
      experience: selectedExperience,
      source: selectedSource,
    })
  }

  const handleClearFilters = () => {
    setSelectedLocation("")
    setSelectedExperience("")
    setSelectedSource("")
    onFilterChange({
      location: "",
      experience: "",
      source: "",
    })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "all") {
      setSelectedSource("")
    } else {
      setSelectedSource(value)
    }

    onFilterChange({
      location: selectedLocation,
      experience: selectedExperience,
      source: value === "all" ? "" : value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.length > 0 && (
          <div className="space-y-2">
            <Label>Source</Label>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                {sources.slice(0, 2).map((source) => (
                  <TabsTrigger key={source} value={source}>
                    {source}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Select value={selectedExperience} onValueChange={setSelectedExperience}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Any experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any experience</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

