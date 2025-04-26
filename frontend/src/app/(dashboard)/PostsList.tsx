"use client"
import { useAllPost } from "@/hooks/services/posts"
import { useToggle } from "@/hooks/useToggle"
import { CreatePostForm } from "@/shared/components/post/CreatePostForm"
import PostCard from "@/shared/components/post/PostCard"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { PlusIcon, SearchIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import React from "react"

const PostsList = () => {
  const { data, isLoading } = useAllPost()
  const [open, toggleOpen, setOpen] = useToggle()
  const session = useSession()

  if (isLoading) {
    return <div>กำลังโหลด</div>
  }

  if (!data) {
    return <div>ไม่พบข้อมูล</div>
  }

  return (
    <div className='p-2 space-y-3'>
      <div className='flex space-x-2'>
        <Input
          placeholder='Search'
          startIcon={<SearchIcon className='text-gray-400' />}
        />
        {session.status === "authenticated" && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className='text-white'>
                Create <PlusIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Post</DialogTitle>
              </DialogHeader>
              <CreatePostForm onClose={() => toggleOpen()} />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className='bg-card divide-y-3 divide-solid divide-gray-100 text-card-foreground rounded-lg shadow-sm space-y-3 border border-border'>
        {data.data.map((item, index) => (
          <PostCard
            key={index}
            avatarUrl='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            author={item.user.username}
            category='History'
            title={item.title}
            excerpt={item.content}
            commentCount={item.comments.length}
          />
        ))}
      </div>
    </div>
  )
}

export default PostsList
