"use client"

import { Button } from "@/shared/components/ui/button"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import Image from "next/image"
import { Input } from "@/shared/components/ui/input"

const formSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: "กรอกตัวอักษรมากกว่า 6 ตัวอักษร",
    })
    .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, {
      message: "ต้องขึ้นต้นด้วยตัวอักษรและสามารถใส่ตัวเลขได้เท่านั้น",
    }),
})

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn("credentials", {
      username: values.username,
      callbackUrl: "/",
    })
  }

  return (
    <Form {...form}>
      <div className='flex items-center justify-center p-8 sm:p-20 flex-1'>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-sm space-y-6'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel data-error={false} className='text-2xl'>
                  Sign in
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-white text-black'
                    placeholder='username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full text-white'>
            Sign In
          </Button>
        </form>
      </div>
      <div className='flex items-center justify-center bg-[#2F5C3A] rounded-bl-3xl rounded-br-3xl md:rounded-br-none md:rounded-l-3xl flex-1'>
        <div className='text-center'>
          <Image
            src='/images/bg-board.png'
            alt='board'
            width={240}
            height={240}
            className='mx-auto'
          />
          <p className='mt-4 italic text-lg'>a Board</p>
        </div>
      </div>
    </Form>
  )
}
