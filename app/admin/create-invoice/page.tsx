"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminSidebar } from "@/components/admin-sidebar"
import { InvoiceTemplate } from "@/components/invoice-template"
import { generateInvoiceNumber, calculateTax, calculateTotal } from "@/lib/invoice-utils"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [preview, setPreview] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: "",
    amount: "",
    paymentMethod: "Card",
    paymentStatus: "Unpaid" as "Paid" | "Unpaid",
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = user ? JSON.parse(user) : null
    if (!user || userData.role !== "admin") router.push("/login")
  }, [router])

  const amount = Number.parseFloat(formData.amount) || 0
  const tax = calculateTax(amount)
  const total = calculateTotal(amount, tax)

  const invoiceData = {
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toLocaleDateString(),
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    clientPhone: formData.clientPhone,
    service: formData.service,
    amount,
    tax,
    total,
    paymentMethod: formData.paymentMethod,
    paymentStatus: formData.paymentStatus,
  }

  const handleCreateInvoice = () => {
    if (formData.clientName && formData.service && formData.amount) {
      setPreview(true)
    } else {
      alert("Please fill in all required fields")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0">
        <div className="p-6 md:p-8">
          {!preview ? (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground">Create Invoice</h1>
                <p className="text-foreground/70">Generate a new invoice for a client</p>
              </div>

              <div className="max-w-2xl">
                <Card className="p-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleCreateInvoice()
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Client Name *</label>
                        <Input
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="Enter client name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                        <Input
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          placeholder="client@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                        <Input
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Service *</label>
                        <Input
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          placeholder="e.g., Gel Manicure"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Amount ($) *</label>
                        <Input
                          required
                          type="number"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Payment Method</label>
                        <select
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-full border border-input rounded-md px-3 py-2"
                        >
                          <option>Cash</option>
                          <option>Card</option>
                          <option>UPI</option>
                          <option>Bank Transfer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Payment Status</label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentStatus: e.target.value as "Paid" | "Unpaid",
                          })
                        }
                        className="w-full border border-input rounded-md px-3 py-2"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>

                    {amount > 0 && (
                      <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-bold">${amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (18%):</span>
                          <span className="font-bold">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Preview Invoice
                    </Button>
                  </form>
                </Card>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 flex gap-4">
                <Button onClick={() => setPreview(false)} variant="outline">
                  Back
                </Button>
              </div>
              <InvoiceTemplate data={invoiceData} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
