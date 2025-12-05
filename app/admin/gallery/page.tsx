"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface GalleryImage {
  id: number
  title: string
  category: string
  image: string
}

export default function GalleryPage() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([
    { id: 1, title: "Rose Gold Glitter", category: "Gel", image: "/placeholder.svg?key=g1" },
    { id: 2, title: "Chrome Mirror", category: "Chrome", image: "/placeholder.svg?key=g2" },
    { id: 3, title: "Bridal White", category: "Bridal", image: "/placeholder.svg?key=g3" },
    { id: 4, title: "Marble Art", category: "Art", image: "/placeholder.svg?key=g4" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ title: "", category: "" })

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") router.push("/login")
  }, [router])

  const handleUpload = () => {
    setImages([
      ...images,
      {
        id: Math.max(...images.map((i) => i.id), 0) + 1,
        title: formData.title,
        category: formData.category,
        image: "/placeholder.svg?key=" + Math.random().toString(36).substring(7),
      },
    ])
    setFormData({ title: "", category: "" })
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Gallery Management</h1>
              <p className="text-foreground/70">Manage nail art photos</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus size={18} /> Upload Photo
            </Button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">Upload Photo</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border border-input rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-input rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleUpload} className="flex-1 bg-primary hover:bg-primary/90">
                      Upload
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-secondary overflow-hidden">
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2">{image.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">{image.category}</span>
                    <button onClick={() => handleDelete(image.id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                      <Trash2 size={16} className="text-destructive" />
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
