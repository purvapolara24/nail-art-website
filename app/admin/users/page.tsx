"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Trash2, Ban } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  status: "Active" | "Blocked"
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      createdAt: "2025-01-15",
      status: "Active",
    },
    {
      id: "2",
      name: "Emily Chen",
      email: "emily@example.com",
      phone: "(555) 234-5678",
      createdAt: "2025-02-20",
      status: "Active",
    },
    {
      id: "3",
      name: "Jessica Martinez",
      email: "jessica@example.com",
      phone: "(555) 345-6789",
      createdAt: "2025-03-10",
      status: "Blocked",
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") router.push("/login")
  }, [router])

  const handleBlockUser = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u)))
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Manage Users</h1>
            <p className="text-foreground/70">Total Users: {users.length}</p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Joined</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary/30">
                      <td className="px-6 py-4 font-semibold text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-foreground">{user.phone}</td>
                      <td className="px-6 py-4 text-foreground">{user.createdAt}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => handleBlockUser(user.id)} className="p-2 hover:bg-secondary rounded-lg">
                          <Ban size={16} className="text-foreground" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
