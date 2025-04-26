"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Topbar() {
  const session = useSession()

  return (
    <header className='w-full h-16 bg-sidebar-primary text-white px-6 py-4 flex items-center justify-between'>
      <div className='text-lg font-serif italic'>a Board</div>
      {session.status !== "loading" && (
        <div className='flex gap-4 items-center'>
          {session.status === "authenticated" ? (
            <>
              <div>{session.data.user.name}</div>
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className='bg-white text-sidebar-foreground px-4 py-1 rounded font-semibold'
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              asChild
              className='bg-white text-sidebar-foreground px-4 py-1 rounded font-semibold'
            >
              <Link href='/login'>Sign In</Link>
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
