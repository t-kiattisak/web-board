import { MessageCircle } from "lucide-react"
import Image from "next/image"
import { ReactNode } from "react"

interface PostCardProps {
  avatarUrl?: string
  author: string
  category: string
  title: string
  excerpt: string
  commentCount: number
  actions?: ReactNode
}

export default function PostCard({
  avatarUrl = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  author,
  category,
  title,
  excerpt,
  commentCount,
  actions,
}: PostCardProps) {
  return (
    <div className='p-6 space-y-3'>
      <div className='flex items-center'>
        <div className='flex items-center gap-3 flex-1'>
          <Image
            width={32}
            height={32}
            src={avatarUrl}
            alt={author}
            className='w-8 h-8 rounded-full object-cover'
          />
          <span className='text-sm text-muted-foreground'>{author}</span>
        </div>
        {actions}
      </div>

      {category && (
        <span className='inline-block w-fit text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full'>
          {category}
        </span>
      )}

      <h2 className='text-lg font-semibold leading-tight break-words line-clamp-1'>
        {title}
      </h2>

      <p className='text-sm text-muted-foreground leading-relaxed break-words line-clamp-3'>
        {excerpt}
      </p>

      <div className='flex items-center gap-1 text-xs text-muted-foreground'>
        <MessageCircle size={14} /> {commentCount} Comments
      </div>
    </div>
  )
}
