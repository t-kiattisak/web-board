export interface ResponseBaseData<T = unknown> {
  data: T
  message: string
  success: boolean
}
