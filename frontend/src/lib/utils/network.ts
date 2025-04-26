import axios from "axios"
import { getSession, signOut } from "next-auth/react"

export const network = axios.create({
  baseURL: process.env.API_URL,
})

let cachedToken: string | null = null

network.interceptors.request.use(
  async (config) => {
    if (!cachedToken) {
      const session = await getSession()
      cachedToken = session?.user.token || null
    }
    if (cachedToken) {
      config.headers.Authorization = `Bearer ${cachedToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

network.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ callbackUrl: "/login" })
    }
    return Promise.reject(error)
  }
)
