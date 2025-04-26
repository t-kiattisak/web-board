import Link from "next/link"
import { Button } from "../ui/button"

export default function Topbar() {
  return (
    <header className='w-full h-16 bg-sidebar-primary text-white px-6 py-4 flex items-center justify-between'>
      <div className='text-lg font-serif italic'>a Board</div>
      <div className='flex gap-4 items-center'>
        <Button
          asChild
          className='bg-white text-sidebar-foreground px-4 py-1 rounded font-semibold'
        >
          <Link href='/login'>Sign In</Link>
        </Button>
      </div>
    </header>
  )
}
