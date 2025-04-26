import { allPost } from "@/services/posts"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import PostsList from "./PostsList"
import { getQueryClient } from "@/lib/query/getQueryClient"

export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["all-posts"],
    queryFn: allPost,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsList />
    </HydrationBoundary>
  )
}
