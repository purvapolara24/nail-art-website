"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ClientSidebar } from "@/components/client-sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, Trash2 } from "lucide-react"

interface Appointment {
  id: number
  service: string
  date: string
  time: string
  price: number
  status: "Confirmed" | "Pending" | "Completed"
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      service: "Gel Manicure",
      date: "2025-12-20",
      time: "2:00 PM",
      price: 45,
      status: "Confirmed",
    },
    {
      id: 2,
      service: "Chrome Nails",
      date: "2025-12-27",
      time: "10:00 AM",
      price: 50,
      status: "Pending",
    },
    {
      id: 3,
      service: "Bridal Nails",
      date: "2025-11-15",
      time: "3:00 PM",
      price: 65,
      status: "Completed",
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) router.push("/login")
  }, [router])

  const handleCancel = (id: number) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">My Appointments</h1>
            <p className="text-foreground/70">Manage your upcoming salon visits</p>
          </div>

          <div className="flex gap-4 mb-8">
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90">Book New Appointment</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{appointment.service}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        <span className="text-foreground/70">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        <span className="text-foreground/70">{appointment.time}</span>
                      </div>
                      <div className="text-foreground font-bold text-lg">${appointment.price}</div>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
                    <span
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                    {appointment.status !== "Completed" && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {appointments.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-foreground/70 mb-4">No appointments scheduled</p>
              <Link href="/book">
                <Button className="bg-primary hover:bg-primary/90">Book Your First Appointment</Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
