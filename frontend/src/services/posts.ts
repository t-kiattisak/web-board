import { network } from "@/shared/utils/network"

export const createPost = async () => {
  const { data } = await network.post("/posts")
  return data
}
