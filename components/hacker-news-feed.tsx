"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Loader2 } from "lucide-react"

interface Story {
  id: number
  title: string
  url?: string
  score: number
  by: string
}

export function HackerNewsFeed() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        const ids: number[] = await res.json()
        const top8 = ids.slice(0, 8)
        const fetched = await Promise.all(
          top8.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json())
          )
        )
        setStories(fetched.filter((s) => s && s.title))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  return (
    <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Hacker News — Top Stories</h3>
        <Badge variant="outline" className="text-xs flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />
          Live
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {stories.map((story) => (
            <li key={story.id} className="flex items-start gap-3 group">
              <span className="text-xs text-muted-foreground mt-1 shrink-0 font-mono bg-muted px-1.5 py-0.5 rounded">
                ▲ {story.score}
              </span>
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-snug hover:text-primary transition-colors flex items-start gap-1"
                >
                  {story.title}
                  <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <span className="text-sm leading-snug text-muted-foreground">{story.title}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
