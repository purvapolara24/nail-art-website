"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ClientSidebar } from "@/components/client-sidebar"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"

interface SavedDesign {
  id: number
  name: string
  category: string
  image: string
}

export default function WishlistPage() {
  const router = useRouter()
  const [designs, setDesigns] = useState<SavedDesign[]>([
    {
      id: 1,
      name: "Rose Gold Glitter",
      category: "Gel",
      image: "/placeholder.svg?key=1",
    },
    {
      id: 2,
      name: "Chrome Mirror",
      category: "Chrome",
      image: "/placeholder.svg?key=2",
    },
    {
      id: 3,
      name: "Bridal White",
      category: "Bridal",
      image: "/placeholder.svg?key=3",
    },
    {
      id: 4,
      name: "Marble Art",
      category: "Art",
      image: "/placeholder.svg?key=4",
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) router.push("/login")
  }, [router])

  const handleRemove = (id: number) => {
    setDesigns(designs.filter((design) => design.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Saved Designs</h1>
            <p className="text-foreground/70">Your nail art inspiration board</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-secondary">
                  <img
                    src={design.image || "/placeholder.svg"}
                    alt={design.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-2">
                    <Heart size={18} fill="currentColor" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2">{design.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground/70">{design.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Book Service
                    </Button>
                    <button
                      onClick={() => handleRemove(design.id)}
                      className="px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {designs.length === 0 && (
            <Card className="p-8 text-center">
              <Heart size={48} className="mx-auto text-foreground/30 mb-4" />
              <p className="text-foreground/70 mb-4">No saved designs yet</p>
              <Button className="bg-primary hover:bg-primary/90">Browse Gallery</Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
