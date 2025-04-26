import { LoginData } from "@/domain/auth/loginData"
import { network } from "@/lib/utils/network"

export const login = async (username: string) => {
  const { data } = await network.post<LoginData>("/auth/login", { username })
  return data
}
