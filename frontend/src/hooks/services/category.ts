import { categoryAll } from "@/services/category"
import { useQuery } from "@tanstack/react-query"

export const useCategoryAll = () =>
  useQuery({
    queryKey: ["category-all"],
    queryFn: categoryAll,
  })
