import Sidebar from "@/shared/components/layout/Sidebar"
import Topbar from "@/shared/components/layout/Topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <div className='fixed top-0 left-0 right-0'>
        <Topbar />
      </div>
      <div className='h-16' />
      <div className='flex flex-1 overflow-hidden'>
        <div className='hidden md:flex w-60 fixed left-0 bottom-0 top-16'>
          <Sidebar />
        </div>
        <main className='flex-1 overflow-y-auto p-6 md:px-60'>{children}</main>
      </div>
    </div>
  )
}
