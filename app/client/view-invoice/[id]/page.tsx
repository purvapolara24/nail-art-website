"use client"
import { InvoiceTemplate } from "@/components/invoice-template"

export default function ViewInvoicePage({ params }: { params: { id: string } }) {
  const mockInvoiceData = {
    invoiceNumber: "INV-001",
    date: "2025-11-15",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    clientPhone: "(555) 123-4567",
    service: "Bridal Nails",
    amount: 65,
    tax: 11.7,
    total: 76.7,
    paymentMethod: "Card",
    paymentStatus: "Paid" as const,
  }

  return <InvoiceTemplate data={mockInvoiceData} />
}
