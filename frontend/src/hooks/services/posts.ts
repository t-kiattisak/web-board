import { allPost, createPost, updatePost } from "@/services/posts"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAllPost = () =>
  useQuery({
    queryKey: ["all-posts"],
    queryFn: () => allPost(),
  })

export const useCreatePost = () => useMutation({ mutationFn: createPost })
export const useUpdatePost = () => useMutation({ mutationFn: updatePost })
