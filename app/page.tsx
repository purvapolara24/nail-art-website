"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Star, ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Luxe Nails provided the most beautiful bridal nails I could have asked for. Absolutely stunning!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    text: "The gel manicure lasted 3 weeks without chipping. The attention to detail is incredible.",
    rating: 5,
  },
  {
    name: "Jessica Martinez",
    text: "Professional, friendly staff. Best nail salon in town. Highly recommended!",
    rating: 5,
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Luxe Nails
                  <span className="text-primary"> Perfection</span>
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Experience the ultimate in nail artistry. Our expert technicians deliver stunning designs and premium
                  care for every occasion.
                </p>
                <div className="flex gap-4">
                  <Link href="/book">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/gallery">
                    <Button size="lg" variant="outline">
                      View Gallery
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-96">
                <img
                  src="/luxury-nail-art-design-with-rose-gold-and-gems.jpg"
                  alt="Luxury nail art"
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
              <p className="text-lg text-foreground/70">
                Premium nail care and artistic designs tailored to your style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Gel Nails", desc: "Long-lasting, glossy finish", price: "₹45", icon: "💅" },
                { title: "French Polish", desc: "Classic elegant style", price: "₹35", icon: "✨" },
                { title: "Bridal Nails", desc: "Special occasion perfection", price: "₹65", icon: "💍" },
              ].map((service) => (
                <Card key={service.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">{service.title}</h3>
                  <p className="text-foreground/70 mb-4">{service.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-lg">{service.price}</span>
                    <Link href="/services">
                      <Button variant="ghost" size="sm">
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Nails?</h2>
            <p className="text-lg mb-8 opacity-90">Book your appointment today and experience luxury nail care</p>
            <Link href="/book">
              <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
                Book Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
