import { z } from "zod"

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
})

export type CreatePostInput = z.infer<typeof createPostInput>
