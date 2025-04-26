import { getQueryClient } from "@/lib/query/getQueryClient"
import PostDetail from "./PostDetail"
import { getPostById } from "@/services/posts"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

interface Props {
  params: Promise<{ postId: string }>
}

export default async function PostDetailPage({ params }: Props) {
  const queryClient = getQueryClient()
  const { postId } = await params

  await queryClient.prefetchQuery({
    queryKey: ["post-by-id", postId],
    queryFn: ({ queryKey }) => getPostById(queryKey[1]),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail />
    </HydrationBoundary>
  )
}
