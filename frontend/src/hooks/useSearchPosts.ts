"use client"

import { useMemo, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"
import { AllPostsData } from "@/domain/posts/allPostsData"

export function useSearchPosts(posts: AllPostsData | undefined) {
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search, 300)

  const data = useMemo(
    () =>
      posts?.data.filter((post) => {
        if (!debouncedSearch.trim()) return true
        return (
          post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          post.content.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      }) || [],
    [debouncedSearch, posts]
  )

  return {
    search,
    setSearch,
    data,
  }
}
