"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We will be in touch soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="font-serif text-3xl font-bold text-foreground">Get in Touch</h2>

                <Card className="p-6 flex gap-4">
                  <Phone className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground">Phone</h3>
                    <p className="text-foreground/70">(555) 123-4567</p>
                  </div>
                </Card>

                <Card className="p-6 flex gap-4">
                  <Mail className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <p className="text-foreground/70">hello@luxenails.com</p>
                  </div>
                </Card>

                <Card className="p-6 flex gap-4">
                  <MapPin className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground">Address</h3>
                    <p className="text-foreground/70">
                      123 Beauty Lane, Suite 100
                      <br />
                      Luxury City, CA 90210
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-foreground mb-4">Hours</h3>
                  <div className="space-y-2 text-foreground/70 text-sm">
                    <p>Monday: Closed</p>
                    <p>Tuesday - Friday: 10am - 6pm</p>
                    <p>Saturday: 10am - 5pm</p>
                    <p>Sunday: 12pm - 4pm</p>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-input rounded-md px-3 py-2 text-foreground bg-background"
                        rows={6}
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
