import "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseBaseData } from "@/shared/domain/reponse"

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ResponseBaseData<null>>
  }
}
