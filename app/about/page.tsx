import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    { name: "Maria Rodriguez", role: "Founder & Head Technician", bio: "15+ years of nail art experience" },
    { name: "Jessica Kim", role: "Senior Technician", bio: "Certified nail artist & designer" },
    { name: "Amanda Brown", role: "Technician", bio: "Specialized in bridal designs" },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">About Us</h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-foreground">Our Story</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Founded in 2010, Luxe Nails has been a premier destination for nail art and care services. Our passion
                for beauty and attention to detail has made us the go-to salon for special occasions, daily manicures,
                and artistic nail designs.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We believe that nail care is a form of self-expression. Each client who walks through our doors receives
                personalized attention and creative consultation to ensure their nails reflect their unique style.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="p-6 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-xl text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-foreground/70">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Experience Luxe Nails Today</h2>
            <Link href="/book">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
