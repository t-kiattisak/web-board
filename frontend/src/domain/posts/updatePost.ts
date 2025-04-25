import { z } from "zod"

export const updatePostInput = z.object({
  postId: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
})

export type UpdatePostInput = z.infer<typeof updatePostInput>
