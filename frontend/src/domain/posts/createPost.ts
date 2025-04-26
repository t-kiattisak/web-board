import { z } from "zod"

export const createPostInput = z.object({
  categoryId: z.string(),
  title: z.string(),
  content: z.string(),
})

export type CreatePostInput = z.infer<typeof createPostInput>
