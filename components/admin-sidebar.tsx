"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, BarChart3, Users, Briefcase, ImageIcon, FileText, Menu, X } from "lucide-react"
import { useState } from "react"

export function AdminSidebar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Briefcase, label: "Services", href: "/admin/services" },
    { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
    { icon: FileText, label: "Invoices", href: "/admin/invoices" },
  ]

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-foreground text-background rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-foreground text-background transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-30`}
      >
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">L</span>
            </div>
            <span className="font-serif text-lg font-bold">Admin Panel</span>
          </Link>

          <nav className="space-y-2 mb-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-background/10 hover:bg-background/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
