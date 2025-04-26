import { AllPostsData } from "@/domain/posts/allPostsData"
import { createPostInput, CreatePostInput } from "@/domain/posts/createPost"
import { PostByIdData } from "@/domain/posts/getPostByIdData"
import { updatePostInput, UpdatePostInput } from "@/domain/posts/updatePost"
import { network } from "@/lib/utils/network"
import { ResponseBaseData } from "@/shared/domain/reponse"

export const allPost = async () => {
  const { data } = await network.get<AllPostsData>("/posts")
  return data
}

export const allPostByUserId = async () => {
  const { data } = await network.get<AllPostsData>("/posts/user/me")
  return data
}

export const getPostById = async (postId: string) => {
  const { data } = await network.get<PostByIdData>(`/posts/${postId}`)
  return data
}

export const createPost = async (input: CreatePostInput) => {
  const { data } = await network.post<ResponseBaseData>(
    "/posts",
    createPostInput.parse(input)
  )
  return data
}

export const updatePost = async (input: UpdatePostInput) => {
  const { postId, ...inputs } = updatePostInput.parse(input)
  const { data } = await network.put(`/posts/${postId}`, inputs)
  return data
}

export const deletePost = async (postId: string) => {
  const { data } = await network.delete(`/posts/${postId}`)
  return data
}
