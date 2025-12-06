"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, Plus } from "lucide-react"

interface Service {
  id: number
  name: string
  category: string
  price: number
  duration: number
}

export default function ServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Gel Manicure", category: "Gel", price: 800, duration: 45 },
    { id: 2, name: "French Polish", category: "French", price: 700, duration: 35 },
    { id: 3, name: "Bridal Nails", category: "Bridal", price: 1000, duration: 65 },
    { id: 4, name: "Chrome Nails", category: "Chrome", price: 750, duration: 50 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", category: "", price: "", duration: "" })

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") router.push("/login")
  }, [router])

  const handleAddService = () => {
    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId
            ? {
              ...s,
              name: formData.name,
              category: formData.category,
              price: Number.parseFloat(formData.price),
              duration: Number.parseInt(formData.duration),
            }
            : s,
        ),
      )
    } else {
      setServices([
        ...services,
        {
          id: Math.max(...services.map((s) => s.id), 0) + 1,
          name: formData.name,
          category: formData.category,
          price: Number.parseFloat(formData.price),
          duration: Number.parseInt(formData.duration),
        },
      ])
    }
    setFormData({ name: "", category: "", price: "", duration: "" })
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
    })
    setEditingId(service.id)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Manage Services</h1>
              <p className="text-foreground/70">Add, edit, or remove services</p>
            </div>
            <Button
              onClick={() => {
                setIsModalOpen(true)
                setEditingId(null)
                setFormData({ name: "", category: "", price: "", duration: "" })
              }}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus size={18} /> Add Service
            </Button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Service Name</label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Price (₹)</label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Duration (min)</label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleAddService} className="flex-1 bg-primary hover:bg-primary/90">
                      Save
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                    <p className="text-foreground/70 text-sm mt-1">{service.category}</p>
                    <div className="flex gap-6 mt-4">
                      <div>
                        <p className="text-foreground/70 text-sm">Price</p>
                        <p className="text-2xl font-bold text-primary">₹{service.price}</p>
                      </div>
                      <div>
                        <p className="text-foreground/70 text-sm">Duration</p>
                        <p className="text-2xl font-bold text-foreground">{service.duration} min</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="p-2 hover:bg-secondary rounded-lg">
                      <Edit2 size={18} className="text-foreground" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                      <Trash2 size={18} className="text-destructive" />
                    </button>
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
