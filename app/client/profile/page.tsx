"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ClientSidebar } from "@/components/client-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      const user = JSON.parse(userData)
      setProfile({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  }, [router])

  const handleSave = async () => {
    if (!profile) return
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ ...profile, role: "client" }))
      setIsSaving(false)
      setIsEditing(false)
      alert("Profile updated successfully!")
    }, 500)
  }

  if (!profile) return null

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-foreground/70">Manage your account information</p>
          </div>

          <div className="max-w-2xl">
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                  <p className="text-foreground/70">{profile.email}</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSave()
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <Input
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input
                    disabled={!isEditing}
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <Input
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  {!isEditing ? (
                    <Button type="button" onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button type="submit" disabled={isSaving} className="bg-primary hover:bg-primary/90">
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button type="button" onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
