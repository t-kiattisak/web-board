import { ResponseBaseData } from "@/shared/domain/reponse"

export type AllPostsData = ResponseBaseData<AllPostsDaum[]>

interface AllPostsDaum {
  id: string
  title: string
  content: string
  userId: string
  createdAt: string
  user: User
  comments: Comment[]
}

interface User {
  id: string
  username: string
  createdAt: string
}

interface Comment {
  id: string
  content: string
  postId: string
  userId: string
  createdAt: string
}
