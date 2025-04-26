import { getQueryClient } from "@/lib/query/getQueryClient"
import { allPostByUserId } from "@/services/posts"
import React from "react"
import OutBlogList from "./OutBlogList"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const OutBlogPage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["all-posts-by-user-id"],
    queryFn: allPostByUserId,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OutBlogList />
    </HydrationBoundary>
  )
}

export default OutBlogPage
