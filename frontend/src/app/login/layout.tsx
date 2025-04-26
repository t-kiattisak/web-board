import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='min-h-screen flex flex-col-reverse md:flex-row bg-[#20322C] text-white'>
      {children}
    </div>
  )
}
