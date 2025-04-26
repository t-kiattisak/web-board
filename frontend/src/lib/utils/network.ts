import axios from "axios"

export const network = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwic3ViIjoiODBjMmM3N2YtY2UxOC00ZmQzLTgxZDgtZjI4NWQ4MTc0ZGFkIiwiaWF0IjoxNzQ1NjUyNDYxLCJleHAiOjE3NDU2NTYwNjF9.OZyQVRO-RfdtlXzx1iclCt11vvp_imXIb3XFjokLGC4`,
  },
})
