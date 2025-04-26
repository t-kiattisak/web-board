import { Home, Pencil } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className='flex flex-col w-full bg-background p-6 gap-6'>
      <h1 className='text-xl font-serif italic text-popover-foreground'>
        a Board
      </h1>
      <nav className='flex flex-col gap-4 text-popover-foreground'>
        <Link href='/' className='flex items-center gap-2 font-medium'>
          <Home size={20} /> Home
        </Link>
        <Link href='/' className='flex items-center gap-2 font-medium'>
          <Pencil size={20} /> Our Blog
        </Link>
      </nav>
    </aside>
  )
}
