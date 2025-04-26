import axios from "axios"
import { getSession } from "next-auth/react"

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
