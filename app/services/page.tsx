"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const services = [
  {
    id: 1,
    name: "Gel Manicure",
    category: "Gel Nails",
    desc: "Premium gel manicure with long-lasting shine and protection",
    price: 45,
    duration: 60,
    image: "/gel-manicure-with-gems.jpg",
  },
  {
    id: 2,
    name: "French Polish",
    category: "French Polish",
    desc: "Classic French nail polish with elegant finish",
    price: 35,
    duration: 45,
    image: "/french-nail-polish.jpg",
  },
  {
    id: 3,
    name: "Bridal Nails",
    category: "Bridal",
    desc: "Luxurious bridal nail design for special occasions",
    price: 65,
    duration: 90,
    image: "/bridal-nail-design.jpg",
  },
  {
    id: 4,
    name: "Chrome Nails",
    category: "Chrome",
    desc: "Trendy chrome nail art with metallic mirror finish",
    price: 50,
    duration: 60,
    image: "/chrome-nails-metallic.jpg",
  },
  {
    id: 5,
    name: "Acrylic Design",
    category: "Acrylic",
    desc: "Custom acrylic nail art with hand-painted designs",
    price: 55,
    duration: 75,
    image: "/acrylic-nail-art.jpg",
  },
  {
    id: 6,
    name: "Nail Art",
    category: "Art",
    desc: "Creative hand-painted nail art and designs",
    price: 40,
    duration: 60,
    image: "/nail-art-design.jpg",
  },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(services.map((s) => s.category))]

  const filteredServices =
    selectedCategory === "All" ? services : services.filter((s) => s.category === selectedCategory)

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-lg text-foreground/70">Explore our complete range of premium nail services</p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary" : ""}
                  variant={selectedCategory === category ? "default" : "outline"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary uppercase">{service.category}</span>
                    </div>
                    <h3 className="font-bold text-xl text-foreground mb-2">{service.name}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{service.desc}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                      <span className="text-sm text-foreground/60">{service.duration} min</span>
                    </div>
                    <Link href="/book">
                      <Button className="w-full bg-primary hover:bg-primary/90">Book Now</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
