import { MessageCircle } from "lucide-react"
import Image from "next/image"

interface PostCardProps {
  avatarUrl: string
  author: string
  category: string
  title: string
  excerpt: string
  commentCount: number
}

export default function PostCard({
  avatarUrl,
  author,
  category,
  title,
  excerpt,
  commentCount,
}: PostCardProps) {
  return (
    <div className='p-6 space-y-3'>
      <div className='flex items-center gap-3'>
        <Image
          width={32}
          height={32}
          src={avatarUrl}
          alt={author}
          className='w-8 h-8 rounded-full object-cover'
        />
        <span className='text-sm text-muted-foreground'>{author}</span>
      </div>

      <span className='inline-block w-fit text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full'>
        {category}
      </span>

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
