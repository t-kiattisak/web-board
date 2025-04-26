"use client"
import React from "react"
import { Button } from "@/shared/components/ui/button"
import { MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useGetPostById } from "@/hooks/services/posts"
import { useParams } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { timeAgo } from "@/lib/utils/timeAgo"
import { CommentPost } from "@/shared/components/post/CommentPost"
import { useToggle } from "@/hooks/useToggle"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import NoSSR from "@/shared/components/ui/no-ssr"

const PostDetail = () => {
  const params = useParams<{ postId: string }>()
  const { data, isLoading, refetch } = useGetPostById(params.postId)

  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  })

  const [comment, toggleComment, setComment] = useToggle()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-muted-foreground'>loading...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-muted-foreground'>Post not found</p>
      </div>
    )
  }

  const post = data.data
  return (
    <div className='p-4 space-y-6'>
      <Link
        href='/'
        className='inline-flex items-center p-2 bg-primary-foreground/10 rounded-full'
      >
        <ArrowLeft className='text-primary-foreground' />
      </Link>

      <div className='flex items-center gap-3'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src='https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=2200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <div className='flex space-x-2 text-muted-foreground text-sm'>
          <span className='font-medium text-card-foreground'>
            {post.user.username}
          </span>
          <span>{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      <span className='inline-block w-fit text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full'>
        {"post.category"}
      </span>

      <h1 className='text-2xl font-bold break-words'>{post.title}</h1>
      <p className='text-sm leading-relaxed text-muted-foreground break-words'>
        {post.content}
      </p>

      <div className='flex items-center gap-2 text-muted-foreground text-sm pt-4'>
        <MessageCircle size={18} />
        {post.comments.length} Comments
      </div>

      <NoSSR>
        {matches ? (
          <>
            <Dialog open={comment} onOpenChange={(open) => setComment(open)}>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='border-primary text-primary'
                >
                  Add Comments
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Comments</DialogTitle>
                </DialogHeader>
                <CommentPost
                  postId={params.postId}
                  onCancel={() => toggleComment()}
                  commentSuccess={() => {
                    toggleComment()
                    refetch()
                  }}
                />
              </DialogContent>
            </Dialog>
          </>
        ) : comment ? (
          <CommentPost
            postId={params.postId}
            onCancel={() => toggleComment()}
            commentSuccess={() => {
              toggleComment()
              refetch()
            }}
          />
        ) : (
          <Button
            variant='outline'
            className='border-primary text-primary'
            onClick={() => toggleComment()}
          >
            Add Comments
          </Button>
        )}
      </NoSSR>

      <div className='space-y-4 pt-4'>
        {post.comments.map((comment) => (
          <div key={comment.id} className='flex items-start gap-3'>
            <Avatar>
              <AvatarImage src='https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=2200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
              <AvatarFallback>USER</AvatarFallback>
            </Avatar>
            <div className='flex flex-col text-sm space-y-2'>
              <div className='flex gap-2 text-muted-foreground'>
                <span className='font-medium text-card-foreground'>
                  {comment.user.username}
                </span>
                <span className='text-xs'>{timeAgo(comment.createdAt)}</span>
              </div>
              <p className='text-muted-foreground break-words'>
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostDetail
