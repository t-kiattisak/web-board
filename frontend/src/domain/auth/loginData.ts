import { ResponseBaseData } from "@/shared/domain/reponse"

export type LoginData = ResponseBaseData<{
  user: User
  token: string
}>

interface User {
  id: string
  username: string
  createdAt: string
}
