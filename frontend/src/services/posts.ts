import { AllPostsData } from "@/domain/posts/allPostsData"
import { createPostInput, CreatePostInput } from "@/domain/posts/createPost"
import { updatePostInput, UpdatePostInput } from "@/domain/posts/updatePost"
import { network } from "@/shared/utils/network"

export const allPost = async () => {
  const { data } = await network.get<AllPostsData>("/posts")
  return data
}

export const createPost = async (input: CreatePostInput) => {
  const { data } = await network.post("/posts", createPostInput.parse(input))
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
