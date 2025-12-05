"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ClientSidebar } from "@/components/client-sidebar"
import Link from "next/link"
import { Calendar, FileText, Heart } from "lucide-react"

const User = {
  id: "string",
  email: "string",
  name: "string",
  role: "string",
}

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  const mockStats = [
    {
      label: "Total Appointments",
      value: "12",
      icon: Calendar,
      color: "text-blue-500",
      link: "/client/appointments",
    },
    {
      label: "Pending Invoices",
      value: "2",
      icon: FileText,
      color: "text-orange-500",
      link: "/client/invoices",
    },
    {
      label: "Saved Designs",
      value: "8",
      icon: Heart,
      color: "text-red-500",
      link: "/client/wishlist",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      service: "Gel Manicure",
      date: "2025-12-20",
      time: "2:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      service: "Chrome Nails",
      date: "2025-12-27",
      time: "10:00 AM",
      status: "Pending",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
            <p className="text-foreground/70">Here's your salon dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockStats.map((stat) => (
              <Link key={stat.label} href={stat.link}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/70 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    {stat.icon && <stat.icon size={32} className={stat.color} />}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Upcoming Appointments */}
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Appointments</h2>
              <Link href="/client/appointments" className="text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{appointment.service}</p>
                    <p className="text-sm text-foreground/70">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Book New Appointment</h3>
              <p className="mb-4 opacity-90">Schedule your next nail appointment</p>
              <Link
                href="/book"
                className="inline-block px-4 py-2 bg-primary-foreground text-primary rounded font-semibold hover:opacity-90"
              >
                Book Now
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Browse Gallery</h3>
              <p className="mb-4 text-foreground/70">Get inspiration from our nail designs</p>
              <Link
                href="/gallery"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90"
              >
                View Gallery
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
