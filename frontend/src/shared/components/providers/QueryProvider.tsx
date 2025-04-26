"use client"

import { getQueryClient } from "@/lib/query/getQueryClient"
import { QueryClientProvider } from "@tanstack/react-query"

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
export default QueryProvider
