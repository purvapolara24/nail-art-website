"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") {
      router.push("/login")
    } else {
      setAdmin(userData)
    }
  }, [router])

  if (!admin) return null

  const monthlyRevenue = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
  ]

  const serviceBreakdown = [
    { name: "Gel Nails", value: 35, color: "#c084fc" },
    { name: "Chrome", value: 25, color: "#f87171" },
    { name: "Bridal", value: 20, color: "#60a5fa" },
    { name: "Art", value: 20, color: "#fbbf24" },
  ]

  const stats = [
    {
      label: "Total Clients",
      value: "248",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Today's Bookings",
      value: "18",
      change: "+5%",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      label: "Revenue",
      value: "₹15,240",
      change: "+8%",
      icon: DollarSign,
      color: "text-purple-500",
    },
    {
      label: "Pending Payments",
      value: "7",
      change: "-3%",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-foreground/70">Welcome back, Admin</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
                  </div>
                  {stat.icon && <stat.icon size={32} className={stat.color} />}
                </div>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-6">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#c084fc" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Service Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {serviceBreakdown.map((service) => (
                  <div key={service.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }}></div>
                    <span className="text-sm text-foreground">
                      {service.name}: {service.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Client</th>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Service</th>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      client: "Sarah Johnson",
                      service: "Gel Manicure",
                      date: "2025-12-20",
                      amount: "₹45",
                      status: "Confirmed",
                    },
                    {
                      client: "Emily Chen",
                      service: "Chrome Nails",
                      date: "2025-12-21",
                      amount: "₹50",
                      status: "Pending",
                    },
                    {
                      client: "Jessica Martinez",
                      service: "Bridal Nails",
                      date: "2025-12-22",
                      amount: "₹65",
                      status: "Confirmed",
                    },
                  ].map((booking, i) => (
                    <tr key={i} className="hover:bg-secondary/30">
                      <td className="px-4 py-3 text-foreground">{booking.client}</td>
                      <td className="px-4 py-3 text-foreground">{booking.service}</td>
                      <td className="px-4 py-3 text-foreground">{booking.date}</td>
                      <td className="px-4 py-3 font-bold text-foreground">{booking.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {booking.status}
                        </span>
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
