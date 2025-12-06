"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ClientSidebar } from "@/components/client-sidebar"
import { Download, Printer } from "lucide-react"

interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  service: string
  amount: number
  status: "Paid" | "Unpaid"
}

export default function InvoicesPage() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-001",
      date: "2025-11-15",
      service: "Bridal Nails",
      amount: 1000,
      status: "Paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      date: "2025-12-01",
      service: "Gel Manicure",
      amount: 800,
      status: "Unpaid",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      date: "2025-12-08",
      service: "Chrome Nails",
      amount: 750,
      status: "Paid",
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) router.push("/login")
  }, [router])

  const handlePrint = (id: string) => {
    alert(`Printing invoice ${id}...`)
  }

  const handleDownload = (id: string) => {
    alert(`Downloading invoice ${id} as PDF...`)
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Bills & Invoices</h1>
            <p className="text-foreground/70">View and manage your invoices</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-blue-50">
              <p className="text-foreground/70 text-sm mb-2">Total Amount</p>
              <p className="text-3xl font-bold text-foreground">₹{totalAmount}</p>
            </Card>
            <Card className="p-6 bg-green-50">
              <p className="text-foreground/70 text-sm mb-2">Paid</p>
              <p className="text-3xl font-bold text-foreground">₹{paidAmount}</p>
            </Card>
            <Card className="p-6 bg-orange-50">
              <p className="text-foreground/70 text-sm mb-2">Due</p>
              <p className="text-3xl font-bold text-foreground">₹{totalAmount - paidAmount}</p>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Invoice</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Service</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-secondary/30">
                      <td className="px-6 py-4 font-mono text-foreground">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4 text-foreground">{invoice.date}</td>
                      <td className="px-6 py-4 text-foreground">{invoice.service}</td>
                      <td className="px-6 py-4 font-bold text-foreground">₹{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                            }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handlePrint(invoice.id)}
                          className="p-2 hover:bg-secondary rounded-lg text-foreground"
                        >
                          <Printer size={16} />
                        </button>
                        <button
                          onClick={() => handleDownload(invoice.id)}
                          className="p-2 hover:bg-secondary rounded-lg text-foreground"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
