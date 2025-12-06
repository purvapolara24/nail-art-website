import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Purvi Nails</h3>
            <p className="text-background/80">Premium nail art salon offering luxury services and designs.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/services" className="hover:text-background transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-background transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/services?cat=Gel" className="hover:text-background transition">
                  Gel Nails
                </Link>
              </li>
              <li>
                <Link href="/services?cat=Bridal" className="hover:text-background transition">
                  Bridal
                </Link>
              </li>
              <li>
                <Link href="/services?cat=Chrome" className="hover:text-background transition">
                  Chrome
                </Link>
              </li>
              <li>
                <Link href="/services?cat=Art" className="hover:text-background transition">
                  Nail Art
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/80">
              <li>Email: hello@luxenails.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Tue-Sun 10am-6pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-background/60">© 2025 Purvi Nails. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
