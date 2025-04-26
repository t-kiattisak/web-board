"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { ArrowRight, MenuIcon } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import Sidebar from "./Sidebar"

export default function Topbar() {
  const session = useSession()

  return (
    <header className='w-full h-16 bg-sidebar-primary text-white px-6 py-4 flex items-center justify-between'>
      <div className='text-lg font-serif italic'>a Board</div>
      <div className='flex items-center space-x-2'>
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

        <Drawer direction='right'>
          <DrawerTrigger asChild>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent className='bg-foreground text-white'>
            <DrawerHeader>
              <DrawerTitle>
                <DrawerClose asChild>
                  <ArrowRight className='text-white' />
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
