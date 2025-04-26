import {
  allPost,
  allPostByUserId,
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "@/services/posts"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAllPost = () =>
  useQuery({
    queryKey: ["all-posts"],
    queryFn: () => allPost(),
  })

export const useAllPostByUserId = () =>
  useQuery({
    queryKey: ["all-posts-by-user-id"],
    queryFn: () => allPostByUserId(),
  })

export const useGetPostById = (postId: string) =>
  useQuery({
    queryKey: ["post-by-id", postId],
    queryFn: ({ queryKey }) => getPostById(queryKey[1]),
  })

export const useCreatePost = () => useMutation({ mutationFn: createPost })
export const useUpdatePost = () => useMutation({ mutationFn: updatePost })
export const useDeletePost = () => useMutation({ mutationFn: deletePost })
