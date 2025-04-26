import { ResponseBaseData } from "@/shared/domain/reponse"

export type PostByIdData = ResponseBaseData<PostByIdDaum>

export interface PostByIdDaum {
  id: string
  title: string
  content: string
  userId: string
  createdAt: string
  user: User
  comments: Comment[]
}

export interface User {
  id: string
  username: string
  createdAt: string
}

export interface Comment {
  content: string
  createdAt: string
  id: string
  user: {
    username: string
  }
}
