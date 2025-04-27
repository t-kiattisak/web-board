"use client"

import { useMemo, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"
import { AllPostsDaum } from "@/domain/posts/allPostsData"

export function useSearchCategoryPosts(postsData: AllPostsDaum[]) {
  const [search, setSearch] = useState("all")
  const [debouncedSearch] = useDebouncedValue(search, 300)

  const data = useMemo(
    () =>
      postsData.filter((post) => {
        if (!debouncedSearch.trim() || debouncedSearch === "all") return true
        return (
          post.category.id
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          post.category.name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        )
      }) || [],
    [debouncedSearch, postsData]
  )

  return {
    search,
    setSearch,
    data,
  }
}
