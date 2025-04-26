import { addComment } from "@/services/comments"
import { useMutation } from "@tanstack/react-query"

export const useAddComment = () => useMutation({ mutationFn: addComment })
