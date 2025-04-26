import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { useUpdatePost } from "@/hooks/services/posts"
import { toast } from "sonner"
import { AllPostsDaum } from "@/domain/posts/allPostsData"

const editPostSchema = z.object({
  community: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

export type EditPostForm = z.infer<typeof editPostSchema>

type CreatePostFormProps = {
  onClose: VoidFunction
  editSuccess: VoidFunction
  defaultValues: AllPostsDaum
}
const EditPostForm = ({
  onClose,
  defaultValues,
  editSuccess,
}: CreatePostFormProps) => {
  const form = useForm<EditPostForm>({
    resolver: zodResolver(editPostSchema),
    defaultValues,
  })

  const { mutate } = useUpdatePost()
  const onSubmit = (values: EditPostForm) => {
    mutate(
      {
        postId: defaultValues.id,
        title: values.title,
        content: values.content,
      },
      {
        onSuccess: (data) => {
          toast(data.message)
          editSuccess()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='community'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Choose a community' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='xc'>xc</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='What`s on your mind...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-2'>
          <Button type='button' variant='outline' onClick={onClose}>
            Close
          </Button>
          <Button type='submit' className='text-white'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { EditPostForm }
