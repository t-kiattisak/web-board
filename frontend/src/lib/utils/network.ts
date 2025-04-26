import axios from "axios"

export const network = axios.create({
  baseURL: process.env.API_URL,
})
