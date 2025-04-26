import { network } from "@/lib/utils/network"

type AddCommentInput = {
  postId: string
  content: string
}
export const addComment = async (input: AddCommentInput) => {
  const { data } = await network.post(`/posts/${input.postId}/comments`, {
    content: input.content,
  })
  return data
}
