import { ResponseBaseData } from "@/shared/domain/reponse"

export type CategoryAllData = ResponseBaseData<
  {
    id: string
    name: string
    createdAt: string
  }[]
>
