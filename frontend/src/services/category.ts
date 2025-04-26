import { CategoryAllData } from "@/domain/category/categoryAllData"
import { network } from "@/lib/utils/network"

export const categoryAll = async () => {
  const { data } = await network.get<CategoryAllData>("/category")
  return data
}
