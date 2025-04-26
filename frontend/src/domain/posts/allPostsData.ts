import { ResponseBaseData } from "@/shared/domain/reponse"

export type AllPostsData = ResponseBaseData<AllPostsDaum[]>

export interface AllPostsDaum {
  id: string
  title: string
  content: string
  userId: string
  createdAt: string
  user: User
  comments: Comment[]
  category: Category
}
interface Category {
  id: string
  name: string
}

interface User {
  id: string
  username: string
  avatarUrl?: string
  createdAt: string
}

interface Comment {
  id: string
  content: string
  postId: string
  userId: string
  createdAt: string
}
