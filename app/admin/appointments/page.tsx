"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, XCircle } from "lucide-react"

interface Appointment {
  id: number
  client: string
  service: string
  date: string
  time: string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  amount: number
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Gel Manicure",
      date: "2025-12-20",
      time: "2:00 PM",
      status: "Confirmed",
      amount: 45,
    },
    {
      id: 2,
      client: "Emily Chen",
      service: "Chrome Nails",
      date: "2025-12-21",
      time: "10:00 AM",
      status: "Pending",
      amount: 50,
    },
    {
      id: 3,
      client: "Jessica Martinez",
      service: "Bridal Nails",
      date: "2025-12-22",
      time: "3:00 PM",
      status: "Confirmed",
      amount: 65,
    },
    {
      id: 4,
      client: "Maria Rodriguez",
      service: "French Polish",
      date: "2025-12-23",
      time: "11:00 AM",
      status: "Pending",
      amount: 35,
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") router.push("/login")
  }, [router])

  const updateStatus = (id: number, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle size={18} className="text-green-600" />
      case "Pending":
        return <Clock size={18} className="text-yellow-600" />
      case "Completed":
        return <CheckCircle size={18} className="text-blue-600" />
      case "Cancelled":
        return <XCircle size={18} className="text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Manage Appointments</h1>
            <p className="text-foreground/70">
              Total: {appointments.length} | Confirmed: {appointments.filter((a) => a.status === "Confirmed").length}
            </p>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <Card key={apt.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(apt.status)}
                      <h3 className="text-xl font-bold text-foreground">{apt.client}</h3>
                      <span className="text-sm text-foreground/70">ID: {apt.id}</span>
                    </div>
                    <p className="text-foreground/70 mb-2">{apt.service}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-foreground/70">
                        {apt.date} at {apt.time}
                      </span>
                      <span className="font-bold text-primary">${apt.amount}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {apt.status !== "Confirmed" && (
                      <Button
                        onClick={() => updateStatus(apt.id, "Confirmed")}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                    )}
                    {apt.status !== "Completed" && (
                      <Button onClick={() => updateStatus(apt.id, "Completed")} size="sm" variant="outline">
                        Mark Done
                      </Button>
                    )}
                    {apt.status !== "Cancelled" && (
                      <Button
                        onClick={() => updateStatus(apt.id, "Cancelled")}
                        size="sm"
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
