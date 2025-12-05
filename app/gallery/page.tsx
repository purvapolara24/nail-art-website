"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const galleryImages = [
  { id: 1, category: "Gel", src: "/gel-nail-design.jpg" },
  { id: 2, category: "Chrome", src: "/chrome-nail-design.jpg" },
  { id: 3, category: "Bridal", src: "/bridal-nail-design.jpg" },
  { id: 4, category: "Art", src: "/nail-art-design.jpg" },
  { id: 5, category: "Gel", src: "/luxury-gel-nails.jpg" },
  { id: 6, category: "Acrylic", src: "/acrylic-nail-art.jpg" },
  { id: 7, category: "French", src: "/french-manicure.png" },
  { id: 8, category: "Art", src: "/artistic-nail-design.png" },
  { id: 9, category: "Chrome", src: "/metallic-chrome-nails.jpg" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))]

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Gallery</h1>
            <p className="text-lg text-foreground/70">Explore our stunning nail art collection</p>
          </div>
        </section>

        {/* Gallery */}
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

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg h-64 bg-secondary cursor-pointer"
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt="Nail design"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity duration-300">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
