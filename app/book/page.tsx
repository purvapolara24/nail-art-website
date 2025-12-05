"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

const services = [
  { id: 1, name: "Gel Manicure", price: 45, duration: 60, category: "Gel Nails" },
  { id: 2, name: "French Polish", price: 35, duration: 45, category: "French Polish" },
  { id: 3, name: "Bridal Nails", price: 65, duration: 90, category: "Bridal" },
  { id: 4, name: "Chrome Nails", price: 50, duration: 60, category: "Chrome" },
  { id: 5, name: "Acrylic Design", price: 55, duration: 75, category: "Acrylic" },
  { id: 6, name: "Nail Art", price: 40, duration: 60, category: "Art" },
]

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Appointment booked successfully! You will receive a confirmation email shortly.")
    setStep(1)
    setSelectedService(null)
    setFormData({ date: "", time: "", name: "", email: "", phone: "", notes: "" })
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Book Your Appointment</h1>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex gap-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= stepNum ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                      }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && <div className={`h-1 w-12 ${step > stepNum ? "bg-primary" : "bg-secondary"}`}></div>}
                </div>
              ))}
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Select a Service</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(service.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${selectedService === service.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                            }`}
                        >
                          <h3 className="font-bold text-foreground">{service.name}</h3>
                          <p className="text-sm text-foreground/70">{service.duration} minutes</p>
                          <p className="text-lg font-bold text-primary mt-2">₹{service.price}</p>
                        </button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!selectedService}
                      className="w-full bg-primary hover:bg-primary/90 gap-2"
                    >
                      Next <ArrowRight size={16} />
                    </Button>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Select Date & Time</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                        <Input
                          required
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Time</label>
                        <Input
                          required
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!formData.date || !formData.time}
                        className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                      >
                        Next <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Your Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Your Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                        <Input
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Special Requests</label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any special requests or preferences?"
                          className="w-full border border-input rounded-md px-3 py-2 text-foreground bg-background"
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="button" onClick={() => setStep(2)} variant="outline" className="flex-1">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
