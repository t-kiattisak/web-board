"use client"
import { AllPostsDaum } from "@/domain/posts/allPostsData"
import { useCategoryAll } from "@/hooks/services/category"
import { useAllPostByUserId, useDeletePost } from "@/hooks/services/posts"
import { useSearchCategoryPosts } from "@/hooks/useSearchCategoryPosts"
import { useSearchPosts } from "@/hooks/useSearchPosts"
import { useToggle } from "@/hooks/useToggle"
import { CreatePostForm } from "@/shared/components/post/CreatePostForm"
import { EditPostForm } from "@/shared/components/post/EditPostForm"
import PostCard from "@/shared/components/post/PostCard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { LoadingData } from "@/shared/components/ui/loading-data"
import NotFoundData from "@/shared/components/ui/not-found-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import { SearchIcon, PlusIcon, PenLineIcon, Trash2Icon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useState } from "react"
import { toast } from "sonner"

const OutBlogList = () => {
  const { data: postAllData, isLoading, refetch } = useAllPostByUserId()
  const {
    data: searchPostData,
    setSearch,
    search,
  } = useSearchPosts(postAllData)
  const {
    data,
    setSearch: setSearchCategory,
    search: searchCategory,
  } = useSearchCategoryPosts(searchPostData)
  const { data: categoryData } = useCategoryAll()

  const [open, toggleOpen, setOpen] = useToggle()
  const [editPostData, setEditPostData] = useState<AllPostsDaum | null>(null)
  const [deletePostData, setDeletePostData] = useState<AllPostsDaum | null>(
    null
  )
  const session = useSession()

  const deletePost = useDeletePost()

  if (isLoading) {
    return <LoadingData />
  }

  if (!postAllData || postAllData.data.length === 0) {
    return <NotFoundData />
  }

  return (
    <div className='p-2 space-y-3'>
      <div className='flex space-x-2'>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Search'
          startIcon={<SearchIcon className='text-gray-400' />}
        />

        <Select
          onValueChange={(value) => setSearchCategory(value)}
          value={searchCategory}
          defaultValue={searchCategory}
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Choose a community' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {categoryData?.data.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
              <CreatePostForm
                createSuccess={() => {
                  refetch()
                  setOpen(false)
                }}
                onClose={() => toggleOpen()}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* {edit post} */}
      <Dialog open={!!editPostData} onOpenChange={() => setEditPostData(null)}>
        <DialogContent aria-describedby='edit-post-description'>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <EditPostForm
            defaultValues={editPostData!}
            editSuccess={() => {
              refetch()
              setEditPostData(null)
            }}
            onClose={() => setEditPostData(null)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletePostData}
        onOpenChange={() => setDeletePostData(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Please confirm if you wish to delete the post
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              Are you sure you want to delete the post? <br />
              Once deleted, it cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='flex-1'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deletePost.mutate(deletePostData!.id, {
                  onSuccess: (data) => {
                    toast(data.message)
                    refetch()
                  },
                })
              }
              className='flex-1 bg-red-600 text-white hover:bg-red-700'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='bg-card divide-y-3 divide-solid divide-gray-100 text-card-foreground rounded-lg shadow-sm space-y-3 border border-border'>
        {data.length === 0 ? (
          <NotFoundData />
        ) : (
          data.map((item, index) => (
            <div key={index}>
              <Link href={`/post/${item.id}`}>
                <PostCard
                  actions={
                    <>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full p-1 px-1'
                        onClick={(event) => {
                          event.preventDefault()
                          setEditPostData(item)
                        }}
                      >
                        <PenLineIcon size={16} />
                      </Button>

                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full p-1 px-1'
                        onClick={(event) => {
                          event.preventDefault()
                          setDeletePostData(item)
                        }}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </>
                  }
                  avatarUrl='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  author={item.user.username}
                  category={item.category.name}
                  title={item.title}
                  excerpt={item.content}
                  commentCount={item.comments.length}
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OutBlogList
