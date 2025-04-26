import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useAddComment } from "@/hooks/services/comments"
import { toast } from "sonner"

const commentPostSchema = z.object({
  comment: z.string().min(1, { message: "Comment is required" }),
})

type CommentPostProps = {
  onCancel: VoidFunction
  commentSuccess: VoidFunction
  postId: string
}
export const CommentPost = ({
  onCancel,
  commentSuccess,
  postId,
}: CommentPostProps) => {
  const form = useForm({
    resolver: zodResolver(commentPostSchema),
    defaultValues: { comment: "" },
  })

  const { mutate } = useAddComment()
  const onSubmit = (values: z.infer<typeof commentPostSchema>) => {
    mutate(
      { content: values.comment, postId },
      {
        onSuccess: (data) => {
          toast(data.message ?? "Comment has been successfully created")
          console.log("values", values)
          commentSuccess()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='What`s on your mind...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end flex-col-reverse md:flex-row gap-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit' className='text-white'>
            Post
          </Button>
        </div>
      </form>
    </Form>
  )
}
