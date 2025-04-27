"use client"
import { useCategoryAll } from "@/hooks/services/category"
import { useAllPost } from "@/hooks/services/posts"
import { useSearchCategoryPosts } from "@/hooks/useSearchCategoryPosts"
import { useSearchPosts } from "@/hooks/useSearchPosts"
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
import { LoadingData } from "@/shared/components/ui/loading-data"
import NotFoundData from "@/shared/components/ui/not-found-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { PlusIcon, SearchIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

const PostsList = () => {
  const { data: postAllData, isLoading, refetch } = useAllPost()
  const [open, toggleOpen, setOpen] = useToggle()
  const session = useSession()
  const { data: categoryData } = useCategoryAll()

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
          placeholder='Search'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
                  toggleOpen()
                  refetch()
                }}
                onClose={() => toggleOpen()}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className='bg-card divide-y-3 divide-solid divide-gray-100 text-card-foreground rounded-lg shadow-sm space-y-3 border border-border'>
        {data.length === 0 ? (
          <NotFoundData />
        ) : (
          data.map((item, index) => (
            <div key={index}>
              <Link href={`/post/${item.id}`}>
                <PostCard
                  avatarUrl={item.user.avatarUrl}
                  author={item.user.username}
                  category={item.category.name ?? ""}
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

export default PostsList
