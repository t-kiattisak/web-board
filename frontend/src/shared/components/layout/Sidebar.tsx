"use client"
import { Home, SquarePenIcon } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { href: "/", icon: <Home size={20} />, label: "Home" },
  { href: "/our-blog", icon: <SquarePenIcon size={20} />, label: "Our Blog" },
]
type SidebarProps = {
  onTap?: VoidFunction
}
export default function Sidebar({ onTap }: SidebarProps) {
  return (
    <aside className='flex flex-col w-full bg-transparent p-6 gap-6'>
      <h1 className='text-xl font-serif italic text-inherit'>a Board</h1>
      <nav className='flex flex-col gap-4 text-inherit'>
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => onTap?.()}
            className='flex items-center gap-2 font-medium'
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
